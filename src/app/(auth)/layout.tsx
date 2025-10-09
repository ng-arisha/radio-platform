function AuthLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="drawer flex flex-col bg-gray-800 min-h-screen items-center justify-center p-4">
            {children}
        </div>
    )
}

export default AuthLayout
