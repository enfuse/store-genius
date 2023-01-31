import {
    Box,
    TextField,
    Typography,
} from '@mui/material';
import {useForm, SubmitHandler} from 'react-hook-form';
import {object, string, TypeOf} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoadingButton} from '@mui/lab';
import {sendFeedback} from '../../client/storeGeniusClient';

import "./FeedbackForm.css"

const registerSchema = object({
    email: string().min(1, "Email is required").email('Email is invalid'),
    message: string()
        .min(2, 'Give us more feedback!')
})
type RegisterInput = TypeOf<typeof registerSchema>;

export const FeedbackForm = () => {
    const {
        register,
        formState: {errors},
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmitForm: SubmitHandler<RegisterInput> = async (values) => {
        console.log("sending form....", values)
        //TODO import snackbar and give notification on success / failure
        // talk to Jonathon Doetsch for tips / his code on dcwa-client
        try {
            await sendFeedback(values.email, values.message);
            reset();
        } catch (e) {
            console.error('Failed to send message', e)
        }
    };

    return (
        <div className='feedback-form'>
            <Box className="feedback-form-box"
                 component='form'
                 aria-label="feedback form"
                 noValidate
                 autoComplete='off'
                 onSubmit={handleSubmit(onSubmitForm)}>
                <Typography variant='h6' sx={{mb: "0.5rem"}}>
                    Send us your Feedback!
                </Typography>
                <TextField
                    sx={{mb: 2}}
                    label='Email'
                    size="small"
                    fullWidth
                    required
                    type='email'
                    error={!!errors['email']}
                    helperText={errors['email'] ? errors['email'].message : ''}
                    {...register('email')}
                />
                <TextField
                    label='Feedback'
                    placeholder="I really liked the ___ but I wish I could ___"
                    fullWidth
                    size="small"
                    required
                    multiline
                    minRows={3}
                    type='message'
                    error={!!errors['message']}
                    helperText={errors['message'] ? errors['message'].message : ''}
                    {...register('message')}
                />

                <LoadingButton
                    variant='contained'
                    // fullWidth
                    type='submit'
                    sx={{py: '0.2rem', mt: '1rem'}}
                >
                    Send!
                </LoadingButton>
            </Box>
        </div>
    );
};
  
  
  