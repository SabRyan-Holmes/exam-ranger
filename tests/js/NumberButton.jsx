import React from 'react'

const NumberButton = () => {
    return (

        <div className="mx-72 scale-75 pt-4 justify-center  grid grid-flow-col  text-center font-bold text-xl gap-0">
            {active > 0 &&
                <button className="bg-white shadow-lg ring-1  p-3 rounded-lg border m-2  px-5" onClick={() => { setActive(active - 1), setPlus(active - 1) }}>
                    Prev
                </button>

            }

            {exam.slice(active, 9 + plus).map((exam, i) => {

                return <button className={' shadow-lg ring-1 p-3 rounded-lg border m-3 px-7' + (active ? 'bg-slate-600' : 'bg-primary')} >{i + 1}</button>

            })}

            {/* <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx- ${active && 'bg-primary'}`} >
      1
  </button>
  <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
      2
  </button>
  <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
      3
  </button>
  <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
      4
  </button>
  <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
      5
  </button>
  <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
      6
  </button>
  <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
      7
  </button>

  <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
      8
  </button>

  <button className={`bg-white shadow-lg ring-1   p-3 rounded-lg border m-3 px-7 mx-4 ${active && 'bg-primary'}`}>
      9
  </button> */}

            <div className="p-3  m-3 px-7 mx-4" onMouseEnter={() => { setShowshowAllNumber(true) }} onMouseLeave={() => { setShowshowAllNumber(false) }}>
                ...
            </div>


            <button className="bg-white shadow-lg ring-1  p-3 rounded-lg border m-3 px-7 mx-4">
                {exam.length}
            </button>

            {active + 1 < exam.length &&
                <button className="bg-white shadow-lg ring-1  p-3 rounded-lg border m-2  px-5 " onClick={() => { setActive(active + 1); setPlus(active + 1) }}>
                    Next
                </button>
            }

        </div>
    )
}

export default NumberButton