"use client";

import { useState } from "react";
import Input from "../shared/input";

function MasterSettings() {

     const [name, setName] = useState("");
      const [address, setAddress] = useState("");
      const [frequency, setFrequency] = useState("");
      const [status, setStatus] = useState("");
    return (
        <div className="flex justify-start items-center ">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-2xl w-full">
            
            <div className="mb-4">
              <Input
                label="Platform Name"
                type="text"
                value={name}
                onChange={setName}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Company Address"
                type="text"
                value={address}
                onChange={setAddress}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Logo Upload"
                type="file"
                value={frequency}
                onChange={setFrequency}
              />
            </div>

          
          </div>
        </div>
    )
}

export default MasterSettings
