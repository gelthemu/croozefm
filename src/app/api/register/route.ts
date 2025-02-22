import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()


export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json()

        // Basic validation
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check if username or email already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                ],
            },
        })

        if (existingUser) {
            // const field = existingUser.username === username ? 'username' : 'email'
            return NextResponse.json(
                {
                    error: existingUser.username === username
                        ? `username already exists`
                        : `email already registered`
                },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            {
                message: 'User created successfully',
            },
            { status: 201 }
        )
    } catch (error) {
        console.error(`Registration error: ${error}`)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
