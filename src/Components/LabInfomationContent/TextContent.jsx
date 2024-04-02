import React from 'react'

function TextContent(props) {
  return (
    <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration-no">
          {props.type}
          </label>
          <input
            id={props.Id}
            value={props.Data}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>
  )
}
export default TextContent