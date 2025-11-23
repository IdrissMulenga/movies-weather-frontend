"use client"
import { useState } from "react"
import Link from "next/link"
import { GET_USER } from "@/libs/graphql"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useQuery } from "@apollo/client/react"
import { RiLogoutCircleRLine, RiDashboardFill, RiMovieFill, RiSettings5Fill } from "react-icons/ri"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import { Avatar, Box, HStack, Text, Button, SkeletonCircle, Span, Heading, IconButton, Stack, Icon, Menu, Portal } from "@chakra-ui/react"
import {motion} from "motion/react";


const linkItem = [
    {name: "Dashboard", icon: RiDashboardFill, href: "/pages/dashboard" },
    {name: "Movies", icon: RiMovieFill, href: "/pages/movies" }
]

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()
    const { data, loading } = useQuery(GET_USER)
    const isActive = (href: string) => pathname === href
    
    const user = data?.me
    
    const logout = () => {
        sessionStorage.removeItem("lastSearchQuery");
        signOut({ callbackUrl: '/' })
    }

    const handleClose = () =>  setOpen(false);

    const handleOpen = () => setOpen(true);
    
    return (
        <>
            <HStack p={2} bgColor={'#4444'} alignItems={'center'} justifyContent={'space-between'} rounded={'2xl'}>
                <HStack> 
                    <Box display={{ md: 'none' }}>
                        <IconButton onClick={open ? handleClose : handleOpen} variant='plain' size='md'>
                            {open ? <IoCloseCircle /> :  <GiHamburgerMenu />}
                        </IconButton>
                    </Box>
                    <Heading fontWeight="bold">Cine<Span color="red.500" fontStyle="italic">Cast</Span></Heading>
                </HStack>
                <HStack>
                    <HStack
                        rounded='full'
                        bgColor={"black"}
                        gap={4}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        {linkItem.map((link) => {
                            const active = isActive(link.href);
                            return(
                                <Link href={link.href} key={link.name}>
                                    <HStack 
                                        py={2}
                                        px={6}
                                        rounded="full"
                                        textAlign={"center"}
                                        fontSize="1rem"
                                        position={"relative"}
                                    >
                                        {active && (
                                            <motion.div
                                                layoutId="nav-active-pill"
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    borderRadius: 9999,
                                                    background: "#be123c",
                                                    zIndex: 0,
                                                }}
                                            />
                                        )}
                                        <HStack pos={"relative"} zIndex={1}>
                                            <Icon as={link.icon} size="sm" />
                                            <Text>{link.name}</Text>
                                        </HStack>
                                    </HStack>
                                </Link>
                            )
                        })}
                    </HStack>
                </HStack>
                <HStack>
                    {loading ?
                        <SkeletonCircle size={10} />
                        :
                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <Button variant="plain" size="sm">
                                    <Avatar.Root colorPalette={'blue'}>
                                        <Avatar.Fallback name={`${user?.name}`} />
                                    </Avatar.Root>
                                </Button>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content>
                                        <Heading size="md" mb={2}>{user?.name}</Heading>
                                        <Text>
                                            <RiSettings5Fill />
                                            <Span ml={2}>
                                                <Link href="/pages/settings">
                                                    Settings
                                                </Link>
                                            </Span>
                                        </Text>
                                    <Menu.Item value="new-txt">New Text File fyjtyjtuyjytu</Menu.Item>
                                    <Menu.Item value="new-file">New File..................</Menu.Item>
                                    <Menu.Item value="new-win">New Window hrtyr6tuiyilkuil</Menu.Item>
                                    <Menu.Item value="open-file">Open File.................</Menu.Item>
                                    <Menu.Item value="export">Export fgbfhnfghnfghnfgnhgfhn</Menu.Item>
                                    <Button onClick={logout} display={{ base: 'none' , md:"flex" }} variant="plain" color={"red"}>
                                        <RiLogoutCircleRLine />
                                        Logout    
                                    </Button>
                                </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    }
                </HStack>
            </HStack>
            {open ? (
                <Stack pos={"absolute"} w={"15rem"} top={24} zIndex={1} display={{ md: 'none' }} bgColor={"#202020ff"} p={2} rounded='2xl' gap={2}>
                    {linkItem.map((link) => (                        
                        <Link href={link.href} key={link.name} >
                            <HStack
                                bgColor={isActive(link.href) ? "#e11d48" : 'black'}
                                p={2} my={2}
                                rounded="xl"
                                textAlign={"center"}
                                onClick={handleClose}
                            >
                                <Icon as={link.icon} size="sm" />
                                <Text>{link.name}</Text>
                            </HStack>
                        </Link>
                    ))}
                    <Button onClick={() => { handleClose(); logout(); }}  size="md">
                        <RiLogoutCircleRLine />
                        Logout
                    </Button>
                </Stack>            
            ) : ''}
        </>
    )
}

export default Navbar
