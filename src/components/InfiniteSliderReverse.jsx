import '../App.css'


const InfiniteSliderReverse = () => {

    const dataSkill = [
        'aws.png',
        'cloudflare.png',
        'orangepi.png',
        'espressif.png',
        'casaos.svg',
        'nextcloud.png',
        'arduino.png',
        'pnet.png',
        'figma.png',
        'alightmotion.png',
        'illustrator.png',
        'lightroom.png',
        'photoshop.png',
    ]

  return (
    <div 
        className="slider relative w-3/4 h-24 overflow-hidden" 
    >
        <div className="slider-list absolute pr-4 flex py-10 gap-5 " style={{'--width':'62px', '--total': dataSkill.length, '--duration':dataSkill.length+'s'}}>
            {
                dataSkill.map( (img, i) => (
                    <a key={i} href="" style={{'--no':i , '--delay': i+'s'}} className='w-8 hover:scale-150 transition-custom top-1/4 absolute slider-item-reverse md:h-10  md:w-10 flex justify-center items-center rounded-full '>
                        <img src={"/skill2/"+img} className="" alt="" />
                    </a>
                ) )
            }
        </div>
    </div>
  )
}

export default InfiniteSliderReverse
