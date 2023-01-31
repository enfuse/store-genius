import {
    Box,
    TextField,
    Typography,
  } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import {  object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { sendFeedback } from '../../client/storeGeniusClient';

import "./FeedbackForm.css"
  const registerSchema = object({
    name: string()
      .min(2, 'Name required')
      .max(30, 'Name must be less than 30 characters'),
    email: string().min(1, "Email is required").email('Email is invalid'),
    message: string()
      .min(2, 'Give us more feedback!')
  })
  type RegisterInput = TypeOf<typeof registerSchema>;
  
  export const FeedbackForm = () => {
    const [loading, setLoading] = useState(false);
  
    const {
      register,
      formState: { errors, isSubmitSuccessful },
      reset,
      handleSubmit,
    } = useForm<RegisterInput>({
      resolver: zodResolver(registerSchema),
    });
  
    useEffect(() => {
      if (isSubmitSuccessful) {
        reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);
  
    const onSubmitForm: SubmitHandler<RegisterInput> = (values) => {
      console.log("sending form....")
      sendFeedback(values.name, values.email, values.message)
    };
    console.log(errors);
  
    return (
      <div className='feedback-form'>
        <Box sx={{ maxWidth: '30rem' }}>
          <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
            Send us your Feedback!
          </Typography>
          <Box
            component='form'
            aria-label="feedback-form"
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <TextField
              // id="Name"
              sx={{ mb: 2 }}
              label='Name'
              fullWidth
              required
              error={!!errors['name']}
              helperText={errors['name'] ? errors['name'].message : ''}
              {...register('name')}
            />
            <TextField
              sx={{ mb: 2 }}
              label='Email'
              fullWidth
              required
              type='email'
              error={!!errors['email']}
              helperText={errors['email'] ? errors['email'].message : ''}
              {...register('email')}
            />
            <TextField
              sx={{ mb: 2 }}
              label='Message'
              fullWidth
              required
              type='message'
              error={!!errors['message']}
              helperText={errors['message'] ? errors['message'].message : ''}
              {...register('message')}
            />
    
            <LoadingButton
              variant='contained'
              fullWidth
              type='submit'
              loading={loading}
              sx={{ py: '0.8rem', mt: '1rem' }}
            >
              Send!
            </LoadingButton>
          </Box>
        </Box>
      </div>
    );
  };
  
  
  