import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import {Box, Heading} from "@chakra-ui/react"
import type {ReactNode}  from "react";

interface Props {
  children: ReactNode;
}



function ProtectedRoute({ children }: Props) {

    return (
        <>
            <SignedIn >{children}</SignedIn>
            <SignedOut>
            <Box textAlign="center" mt={10}>
                <Heading mb={4}>Please Sign In to access Saved Cities</Heading>
                <SignInButton />
            </Box>
            </SignedOut>
        </>
    );
}
 
export default ProtectedRoute;