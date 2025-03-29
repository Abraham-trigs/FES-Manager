import React from 'react'

const ProjectCard = () => {
  return (
    <>
      <div className="relative flex flex-col items-center">

        {/* Project category */}
        <p className="absolute top-0 -mt-[-5px] z-10  px-2 font-bold" >CATEGORY </p>

        {/* funds needed */}
        <p className="absolute 
                      text-left 
                      text-[0.8rem] 
                      top-0 
                      -mt-[-185px] 
                      z-10 
                      ml-[-125px] 
                      px-2 
                      font-bold 
                      bg-greenNeon" 
                      > Funds Amount </p>

        {/* Project id */}
        <p className="absolute top-0 -mt-[-203px] z-10  px-2 font-bold" >ID-799234737</p>
        
        {/* percentage Bar */}
        <div className="w-[220px] bg-darkGreen rounded-br-2xl rounded-bl-2xl h-6 absolute my-[160px]">
          <div className="bg-green-500 h-full rounded-full text-white text-center text-sm leading-6" style={{ width: "70%" }}>
            70%
          </div>
        </div>


        <div className="w-[230px] 
                        h-[370px] 
                        bg-green 
                        rounded-3xl 
                        flex 
                        flex-col 
                        items-center">
          
          <div className="w-[230px] 
                          h-[270px] 
                          bg-darkShade 
                          border-[3px] 
                          border-cyanNeon
                          rounded-3xl flex 
                          justify-center 
                          items-center">
           
           {/* Project Image Container */}
            <div className="w-[200px] 
                            h-[140px] 
                            bg-shade 
                            rounded-3xl 
                            -mt-16
                          border-[3px] 
                          border-highlight
                            ">
                            </div>
          </div>

          {/* Buttons and plus Symbol */}
          <div className="flex flex-col justify-center items-center -my-[55px]">

            {/* plus Sumbol */}
            <div className=" w-[30px] 
                            h-[30px] 
                            bg-shade 
                            font-bold 
                            text-[2rem] 
                            text-semiGreen 
                            flex flex-row 
                            justify-center
                            items-center 
                            my-4">
                +
              </div>
            
            {/* button container */}
            <div className="flex 
                            flex-row 
                            items-center 
                            -mt-11 
                            space-x-[65px]">

              <button className="bg-darkGreen 
                                text-white 
                                p-3 py-1 
                                border-2 
                                border-darkGreen 
                                rounded-lg 
                                font-semibold 
                                text-[0.8rem]">
                FES Aid
              </button>

              <button className="bg-cyanNeon 
                                p-3 py-1 
                                border-2 
                                border-darkGreen 
                                rounded-lg 
                                font-semibold 
                                text-[0.8rem]">
                Details
              </button>

            </div>
          </div>
        </div>

        {/* Project Title */}
        <div className="w-[230px] h-[40px] will-change-contents my-[-100px]" >
          <p className='w-full text-center truncate p-2 text-white font-bold'>
            Project Title
          </p>
        </div>

        {/* Project Details Preview */}

        <div className="w-[220px] h-[60px] rounded-br-3xl rounded-bl-3xl my-[95px]" >
          <p className='line-clamp-3 w-[210px] h-[55px] leading-tight text-center  py-2 px-2 text-white font-normal text-[0.8rem] overflow-hidden text-ellipsis  '>
            Project Details
          </p>
        </div>

      </div>


    </>
  )
}

export default ProjectCard;
