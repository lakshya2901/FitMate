import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from '@/model/User';
import dbConnect from '@/lib/dbConnect';

interface Credentials {
    identifier: string;
    password: string;
  }
  
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
            // @ts-expect-error Argument type mismatch from NextAuth credentials
              async authorize(credentials: Credentials): Promise<User | null> {
                await dbConnect();
                try{
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier},
                        ]
                    })
                    if(!user){
                        throw new Error("no user found with email");
                    }

                    if(!user.isVerified){
                        throw new Error("User not verified");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if(isPasswordCorrect){
                        return user
                    } else{
                        throw new Error("Incorrect password");

                    }
                }catch(error){
                    throw new Error(error as string);
                }
              }
        }),
    ],
    callbacks: {
        
          async jwt({ token, user}) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token
          },
          
          async session({ session, token }) {
            if(token){
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session
          },
    },
    pages:{
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRET,
    
}

