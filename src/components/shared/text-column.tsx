function TextColumn({label,value}:{label:string,value:string}) {
    return (
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-gray-500 font-normal">{label}</h1>
          <p className="text-gray-300 font-medium">{value}</p>
        </div>
    )
}

export default TextColumn
