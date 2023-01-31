// import React from 'react';
import {render, screen, cleanup, RenderResult} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import {FeedbackForm} from './FeedbackForm'
import { act } from 'react-test-renderer';
import {sendFeedback} from '../../client/storeGeniusClient'
// import {prettyDOM} from '@testing-library/dom'

jest.mock("../client/storeGeniusClient");

describe("<FeedbackForm/>", ()=>{
  let renderResult: RenderResult
  beforeEach( ()=>{
    renderResult = render(<FeedbackForm/>)
    }
  )
  afterEach(() => {
  cleanup()
  });
  describe('When form renders', ()=>{
    it("displays empty form with submit button", ()=>{      
      expect(screen.getByRole('form', {name:"feedback-form"})).toHaveFormValues({
        name:"",
        email:"",
        message:"",
      })
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('When form is submitted', ()=>{
    it("should include name", async ()=>{    
      const emailInput = screen.getByRole('textbox', {name:"Email"})
      const messageInput = screen.getByRole('textbox', {name:"Message"})
      const button = await screen.getByRole('button')
      await act(async ()=>{
        await userEvent.type(emailInput, 'test@gmail.com')
        await userEvent.type(messageInput, 'test-message')
        await userEvent.click(button)
        }
      )
      expect(screen.getByText("Name required")).toBeInTheDocument()      
    })
    it("should include email", async ()=>{    
      const nameInput = screen.getByRole('textbox', {name:"Name"})
      const messageInput = screen.getByRole('textbox', {name:"Message"})
      const button = await screen.getByRole('button')
      await act(async ()=>{
        await userEvent.type(nameInput, 'John Wick')
        await userEvent.type(messageInput, 'Your demo is amazing')
        await userEvent.click(button)
        }
      )
      expect(screen.getByText("Email is required")).toBeInTheDocument()      
    })
    it("should include a valid email", async ()=>{    
      const nameInput = screen.getByRole('textbox', {name:"Name"})
      const emailInput = screen.getByRole('textbox', {name:"Email"})
      const messageInput = screen.getByRole('textbox', {name:"Message"})
      const button = await screen.getByRole('button')
      await act(async ()=>{
        await userEvent.type(nameInput, 'John Wick')
        await userEvent.type(emailInput, 'incorrect-email-format@fake-domain')
        await userEvent.type(messageInput, 'test-message')
        await userEvent.click(button)
        }
      )
      expect(screen.getByText("Email is invalid")).toBeInTheDocument()      
    })
    it("should include feedback message", async ()=>{    
      const nameInput = screen.getByRole('textbox', {name:"Name"})
      const emailInput = screen.getByRole('textbox', {name:"Email"})
      const button = await screen.getByRole('button')
      await act(async ()=>{
        await userEvent.type(nameInput, 'John Wick')
        await userEvent.type(emailInput, 'incorrect-email-format@fake-domain')
        await userEvent.click(button)
        }
      )
      expect(screen.getByText("Give us more feedback!")).toBeInTheDocument()      
    })
    describe("when form is validated", ()=>{
      let feedbackMock: jest.Mock<any, any, any>
      beforeEach(async()=>{
        feedbackMock = (sendFeedback as jest.Mock).mockResolvedValue({});
        const nameInput = screen.getByRole('textbox', {name:"Name"})
        const emailInput = screen.getByRole('textbox', {name:"Email"})
        const messageInput = screen.getByRole('textbox', {name:"Message"})
        const button = await screen.getByRole('button')
        await act(async ()=>{
          await userEvent.type(nameInput, 'John Wick')
          await userEvent.type(emailInput, 'johnw@enfuse.io')
          await userEvent.type(messageInput, 'Really long message to send for feedback')
          await userEvent.click(button)
          }
        )
      })
      it("should send all information to email service", async ()=>{

        expect(feedbackMock).toHaveBeenCalledTimes(1)
      })
      it("should clear form", async ()=>{
        expect(screen.getByRole('form', {name:"feedback-form"})).toHaveFormValues({
          name:"",
          email:"",
          message:"",
        })
      })
    })
  })
})
