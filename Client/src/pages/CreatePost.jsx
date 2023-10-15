import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {preview}  from '../assets';
import {getRandomPrompt} from '../utils';
import {FormField,Loader} from '../Components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    name:'',
    prompt:'',
    photo:''
  });

  const [generatingImg,setGeneraingImg] = useState(false);
  const [loading,setLoading] = useState(false);


  const handleSubmit = async(e)=>{
      e.preventDefault();
      if(form.prompt && form.photo){
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/v1/post',{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify(form)
            })

            await response.json();
            navigate('/');
        } catch (error) {
            alert(error);
        } 
        finally{
          setLoading(false);
        }

      }
      else{
        alert("Please Enter a prompt and generate an image ");
      }
  }
  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSurpriseMe = ()=>{
      const randomPrompt = getRandomPrompt(form.prompt);
      setForm({...form,prompt:randomPrompt});
  }

  const generateImage = async ()=>{
    if(form.prompt){
      try {
          setGeneraingImg(true);
          const response = await fetch('http://localhost:8080/api/v1/dalle',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt:form.prompt}) 
          })

          const data = await response.json();

          setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})

      } catch (error) {
          console.log(error);
      }
      finally{
        setGeneraingImg(false);
      }
    }
    else{
      alert('Please Enter A prompt');
    }
  }


  return (
    <section className='max-w-7xl mx-auto'>
      <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>
               Create
            </h1> 
            <p className='pt-2 text-[#666e75] text-[14px] max-w-[500px]'>
              Create imaginative and visually stunning images through  DALL- E AI and share them in the community.
            </p>
        </div>
        <form 
        className='mt-16 max-w-3xl '
        onSubmit={handleSubmit}
        >
          <div className='flrx flex-col gap-5'>
            <FormField 
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange = {handleChange}
            />
             <FormField 
            labelName="prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange = {handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            />
            <div className='relative bg-gray-50 border border-gray-300 text-gary-900 text-sn rounded-lg focus:ring-blur-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
          {
            form.photo?(
              <img src={form.photo} alt={form.prompt} 
              className='w-full h-0full object-contain'
              />)
              :(
                <img src={preview} alt="preview"
                className='w-9/12 h-9/12 object-contain opacity-40'
                />
            )
          }
          {
            generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg '>
                  <Loader/>
              </div>
            )
          }
            </div>

          </div>
          <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10 '>
            <p className='mt-2 text-[#666e75] text-[14px] '>Once You have created image you can shar eit with the community</p>
            <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>

        </form>
    </section>
  )
}

export default CreatePost;