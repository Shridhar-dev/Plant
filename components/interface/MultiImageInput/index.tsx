"use client"
import { XCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState, ChangeEvent } from 'react'
import { useDropzone } from 'react-dropzone'

function MultiImageInput(
        { updateFormData } : 
        { updateFormData:(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, type:string)=>void }
    ) {
  const [images, setImages] = useState<any>([])
  const onDrop = useCallback((acceptedFiles:any) => {
    acceptedFiles.forEach((file:any) => {
        const reader = new FileReader()
  
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onloadend = () => {
          setImages((prev:any)=>([...prev,reader.result]))
        }
        reader.readAsDataURL(file)
    })
    
  }, [])

  const removeImage = (id:number) => {
    let prevImages = [...images]
    let newImages = prevImages.flatMap((img,i)=>{
        if(i!==id){
            return img
        }
        else{
            return []
        }
    })
    setImages(newImages)
  }

  useEffect(() => {
    updateFormData(images,"images")
  }, [images])
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
        <p className='font-semibold mb-2'>Add your images</p>
        <div {...getRootProps()} className=' border-2 border-dashed rounded-md p-10'>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
        <div className='flex items-center gap-2 mt-2 w-full '>
                {
                    images.map((image:any, i:number)=>(
                        <div className=' h-16 w-16 overflow-hidden rounded-md relative'>
                            <div className='h-full w-full top-0 left-0 z-10 absolute opacity-0 hover:opacity-100'>
                                <XCircleIcon onClick={()=>removeImage(i)} className='text-white absolute right-0.5 top-0.5 h-4 w-4 cursor-pointer'/>
                            </div>
                            <Image
                                src={image}
                                height={96}
                                width={96}
                                alt='product-image'
                                className=' object-fill'
                            />
                        </div>
                    ))
                }
            
        </div>
    </div>
  )
}

export default MultiImageInput