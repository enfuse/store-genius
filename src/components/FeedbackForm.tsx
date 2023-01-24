import {
    Box,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    TextField,
    Typography,
  } from '@mui/material';
  import { useForm, SubmitHandler } from 'react-hook-form';
  import { literal, object, string, TypeOf } from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { useEffect, useState } from 'react';
  import { LoadingButton } from '@mui/lab';
  import Checkbox from '@mui/material/Checkbox';
  
  const registerSchema = object({
    name: string()
      .nonempty('Name is required')
      .max(32, 'Name must be less than 100 characters'),
    email: string().min(1, "Email required").email('Email is invalid'),
    message: string()
      .min(50, 'Give us more feadback!')
      .max(500, 'Password must be less than 32 characters'),
  })
//   .refine((data) => data.email.length < 250, {
//     message: 'Give us more feedback!',
//   });
  
  type RegisterInput = TypeOf<typeof registerSchema>;
  
  const RegisterPage = () => {
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
      console.log(values);
    };
    console.log(errors);
  
    return (
      <Box sx={{ maxWidth: '30rem' }}>
        <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
          Send us your Feedback!
        </Typography>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <TextField
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
          
  
          {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox required />}
              {...register('terms')}
              label={
                <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                  Accept Terms and Conditions
                </Typography>
              }
            />
            <FormHelperText error={!!errors['terms']}>
              {errors['terms'] ? errors['terms'].message : ''}
            </FormHelperText>
          </FormGroup> */}
  
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
    );
  };
  
  export default RegisterPage;
  
  