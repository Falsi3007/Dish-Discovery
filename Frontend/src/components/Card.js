import React from 'react';
// import pic from '../assets/aa.png'

const Card = () => {
  return (
    <div className='max-w-screen-xl mx-auto p-4 py-12'>
      <h1 className='text-orange-600 font-bold text-4xl text-center mb-6'>Top Youtube Chefs</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-4'>
        <div className='rounded-xl relative hover:scale-105 duration-500 cursor-pointer'>
          <div className='absolute w-full h-full bg-black/50 rounded-xl text-white p-4'>
            <p className='font-bold text-2xl'>Chef Ranveer Brar</p>
            <a href='https://www.youtube.com/@RanveerBrar' target='_blank' rel='noopener noreferrer'>
              <button className='border border-white bg-white text-black mx-2 rounded-xl px-5 py-1 absolute bottom-4 shadow-md'>Visit Channel</button>
            </a>
          </div>
          <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' src="https://static.businessworld.in/article/article_extra_large_image/1661586179_s05PVJ_Ranveer_Brar_Victorinox_campaign.jpg" alt="" />
        </div>
        <div className='rounded-xl relative hover:scale-105 duration-500 cursor-pointer'>
          <div className='absolute w-full h-full bg-black/50 rounded-xl text-white p-4'>
            <p className='font-bold text-2xl'>Cook with Parul</p>
            <a href='https://www.youtube.com/@CookWithParul' target='_blank' rel='noopener noreferrer'>
              <button className='border border-white bg-white text-black mx-2 rounded-xl px-5 py-1 absolute bottom-4 shadow-md'>Visit Channel</button>
            </a>
          </div>
          <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' src="https://i.pinimg.com/280x280_RS/35/8b/bc/358bbc199e6fc36f6463243e55978c4b.jpg" alt="" />
        </div>
        <div className='rounded-xl relative hover:scale-105 duration-500 cursor-pointer'>
          <div className='absolute w-full h-full bg-black/50 rounded-xl text-white p-4'>
            <p className='font-bold text-2xl'>Sanjeev Kapoor</p>
            <a href='https://www.youtube.com/@sanjeevkapoorkhazana' target='_blank' rel='noopener noreferrer'>
              <button className='border border-white bg-white text-black mx-2 rounded-xl px-5 py-1 absolute bottom-4 shadow-md'>Visit Channel</button>
            </a>
          </div>
          <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' src="https://images.yourstory.com/cs/7/4c455a90a21411e98b07315772315642/SANJEEVKAPOORPLACEHOLDERFotor-1599113083364.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Card;
