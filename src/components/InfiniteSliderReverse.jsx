import '../App.css'


const InfiniteSliderReverse = () => {

    const dataSkill = [
        'docker.svg',
        'caddy.svg',
        'traefikmesh.svg',
        'cloudflare.png',
        'aws.png',
        'linux.svg',
        'postgresql.svg',
        'redis.svg',
        'nextcloud.png',
        'casaos.svg',
        'pnet.png',
        'orangepi.png',
        'espressif.png',
        'arduino.png',
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
