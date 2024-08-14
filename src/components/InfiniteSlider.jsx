import '../App.css'


const InfiniteSlider = () => {

    

    const dataSkill = [
        'bun.png',
        'elysiajs.webp',
        'react.png',
        'svelte.png',
        'adonis.png',
        'node.png',
        'express.png',
        'tailwind.webp',
        'go.jpg',
        'Laravel.png',
        'java.png',
        'springboot.png',
        'rust.png',
        'tauri.svg',
    ]

  return (
    <div 
        className="slider relative w-3/4 h-24 overflow-hidden" 
    >
        <div className="slider-list absolute pr-4 flex py-10 gap-5 " style={{'--width':'62px', '--total': dataSkill.length, '--duration':dataSkill.length+'s'}}>
            {
                dataSkill.map( (img, i) => (
                    <a key={i} href="" style={{'--no':i , '--delay': i+'s'}} className='w-8 hover:scale-150 transition-custom top-1/4 absolute slider-item md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src={"/skill/"+img} className="" alt="" />
                    </a>
                ) )
            }
        </div>
    </div>
  )
}

export default InfiniteSlider
