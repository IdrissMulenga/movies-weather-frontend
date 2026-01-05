"use client"
import { Grid, Field, Text, InputGroup, Input, Button, Span, Heading } from "@chakra-ui/react"
import { MdOutlineEmail } from "react-icons/md"
import { CiLock } from "react-icons/ci"
import { PasswordInput } from './../../../components/ui/password-input';
import Link from "next/link";
import useLogin from "@/app/hooks/useLogin";
import { ColorModeButton } from "@/components/ui/color-mode";

const LoginForm = () => {
    const {formik, isLoading} = useLogin()
    return (
        <Grid
            w={{ sm: "350px", md: '450px' }}
            border='1px solid'
            borderColor='cardBorder'
            p={6} alignItems='center'
            rounded='2xl'
        >
            <ColorModeButton />
            <Heading textAlign="center" pb={6} fontWeight="bold" >Login to Cine<Span color="red.500" fontStyle="italic">Cast</Span></Heading>
            <form noValidate onSubmit={formik.handleSubmit}>
                <Field.Root required mb={6}>
                    <Field.Label>
                        <Text fontWeight='bold'>Email</Text>
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup flex='1' startElement={<MdOutlineEmail size='16' />}>
                        <Input
                            type='email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter your email.......'
                            h='48px'
                            outline="none"
                            bgColor="inputBg"
                            border="none"
                            borderBottom={formik.touched.email && formik.errors.email ? '1px solid red' : 'transparent'}
                        />
                    </InputGroup>
                    {formik.touched.email && formik.errors.email && (
                        <Text color="red" fontSize='0.8rem'>{formik.errors.email}</Text>
                    )}
                </Field.Root>
        
                <Field.Root required mb={6}>
                    <Field.Label>
                        <Text fontWeight='bold'>Password</Text>
                        <Field.RequiredIndicator />
                    </Field.Label>

                    <InputGroup flex='1' startElement={<CiLock size='16' color='text-third' />}>
                        <PasswordInput
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            outline="none"
                            placeholder='************'
                            h='48px'
                            bgColor="inputBg"
                            border="none"
                            borderBottom={formik.touched.password && formik.errors.password ? '1px solid red' : 'transparent'}
                        />
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && (
                        <Text color="red" fontSize='0.8rem'>{formik.errors.password}</Text> 
                    )} 
                </Field.Root>
                <Grid>
                    <Button
                        disabled={isLoading}
                        loadingText="loging in..."
                        loading={isLoading}
                        type="submit"
                    >
                        Login
                    </Button>
                </Grid>
                <Link href='/auth/signup'>
                    <Text textAlign="center" pt={4}>
                        {"Don't have an account?"}
                        <Span fontWeight={"bold"} color="#ba0505ff" pl={2}>
                            Create here
                        </Span>
                    </Text>
                </Link>
            </form>
        </Grid>
    )
}

export default LoginForm
