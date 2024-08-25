/* eslint-disable react/prop-types */
import { BsArrowDown, BsArrowUp } from "react-icons/bs"


const Analysis = ({title, amount, change,changeType, Icon,iconColor}) => {
  return (
    <section className="border rounded-lg shadow-md">
      <div className="relative p-4">
        <div className="relative text-end">
          <p className="text-lg font-bold">{ title }</p>
          <p className="font-extrabold text-xl my-3">{ title === "Revenue" || title === "Expenses" ? <span>&#8358;</span>:""}{ amount }</p>
          <div className="text-small flex justify-end space-x-2">
            <div>
              { changeType === "up" ? (
                <div className="text-success flex items-center justify-end">
                  <BsArrowUp />
                  {change}%
                </div> )
                : (
                  <div className="text-danger flex items-center justify-end">
                    <BsArrowDown />
                    {change}%
                  </div>
                )
              }
            </div>
              <p>Last month</p>
          </div>
        </div>
        <div className={`absolute h-10 w-10 bg-${iconColor}-50 rounded-md top-0 left-0 flex items-center justify-center`}>
          {Icon}
        </div>
      </div>
    </section>
  )
}

export default Analysis