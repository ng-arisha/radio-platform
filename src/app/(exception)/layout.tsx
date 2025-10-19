function UnAuthorizedLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="drawer h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-red-600 p-4">
            {children}
        </div>
    )
}

export default UnAuthorizedLayout
