const Error = (error)=>{
    return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                    {error}
                </div>
            </div>
        )
}

export default Error