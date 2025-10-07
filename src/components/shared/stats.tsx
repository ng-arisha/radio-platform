import { LucideIcon } from "lucide-react";
import Card from "./card";

function Stats({title,value,Icon}:{title:string,value:string | number,Icon:LucideIcon}) {
  return (
    <Card className="flex justify-between items-center p-4">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-gray-500 font-normal">{title}</h1>
        <p className="text-gray-300 font-medium">{value}</p>
      </div>
      <Icon className="text-gray-400" size={32} />
    </Card>
  );
}

export default Stats;
