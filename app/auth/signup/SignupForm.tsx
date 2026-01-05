import { Grid, Field, Text, InputGroup, Input, Button, Flex, Span, Heading } from "@chakra-ui/react"
import { MdOutlineEmail } from "react-icons/md"
import { PasswordInput } from "@/components/ui/password-input"
import { CiLock } from "react-icons/ci"
import { GrMapLocation } from "react-icons/gr"
import Link from "next/link"
import useSignup from "@/app/hooks/useSignup"

const SignupForm = () => {
    const { formik, isLoading } = useSignup()
    const { handleBlur, handleSubmit, handleChange, touched, errors, values } = formik;
    return (
        <Grid
            w={{ sm: "350px", md: '450px' }}
            border='1px solid'
            borderColor='cardBorder'
            p={6} alignItems='center'
            rounded='2xl'
        >
            <Heading textAlign="center" pb={6} fontWeight="bold">Sign up for Cine<Span color="red.500" fontStyle="italic">Cast</Span></Heading>
            <form noValidate onSubmit={handleSubmit}>
                <Field.Root required mb={4}>
                    <Field.Label>
                        <Text color="gray.300" fontWeight='bold'>full name</Text>
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup flex='1' startElement=''>
                        <Input
                            type='text'
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='user name'
                            h='48px'
                            outline="none"
                            bgColor="inputBg"
                            border="none"
                            borderBottom={touched.name && errors.name ? '1px solid red' : 'transparent'}
                        />
                    </InputGroup>
                    {touched.name && errors.name && (
                        <Text color="red" fontSize='0.8rem'>{errors.name}</Text>
                    )} 
                </Field.Root>

                <Field.Root required mb={4}>
                    <Field.Label>
                        <Text fontWeight='bold'>Email</Text>
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup flex='1' startElement={<MdOutlineEmail size='16' color='text-third' />}>
                        <Input
                            type='text'
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Enter your email'
                            h='48px'
                            border="none"
                            bgColor="inputBg"
                            outline="none"
                            borderBottom={touched.email && errors.email ? '1px solid red' : 'transparent'}
                        />
                    </InputGroup>
                    {touched.email && errors.email && (
                        <Text color="red" fontSize='0.8rem'>{errors.email}</Text>
                    )} 
                </Field.Root>
                <Flex gap={4} mb={4}>
                    <Field.Root required>
                        <Field.Label>
                            <Text fontWeight='bold'>Password</Text>
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup flex='1' startElement={<CiLock size='16' color='text-third' />}>
                            <PasswordInput 
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='************'
                                h='48px'
                                outline="none"
                                bgColor="inputBg"
                                border="none"
                                borderBottom={touched.password && errors.password ? '1px solid red' : 'transparent'}
                            />
                        </InputGroup>
                        {touched.password && errors.password && (
                            <Text color="red" fontSize='0.8rem'>{errors.password}</Text>
                        )} 
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>
                            <Text fontWeight='bold'>City</Text>
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup flex='1' startElement={<GrMapLocation size='16' color='text-third' />}>
                            <Input 
                                name='city'
                                placeholder="enter your city"
                                h='48px'
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                outline="none"
                                bgColor="inputBg"
                                border="none"
                                borderBottom={touched.city && errors.city ? '1px solid red' : 'transparent'}
                            />
                        </InputGroup>
                        {touched.city && errors.city && (
                            <Text color="red" fontSize='0.8rem'>{errors.city}</Text>
                        )} 
                    </Field.Root>
                </Flex>
                    <Grid>
                        <Button
                            disabled={isLoading}
                            loadingText="signing up....."
                            loading={isLoading}
                            type="submit"
                        >
                            Sign up
                        </Button>
                    </Grid>
                <Link href='/'>
                    <Text textAlign="center" pt={4}>
                        already have an account?
                        <Span fontWeight={"bold"} color="#ba0505ff" pl={2}>
                            login here
                        </Span>
                    </Text>
                </Link>
            </form>
        </Grid>
    )
}

export default SignupForm
