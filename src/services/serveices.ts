import { db,storage } from "../firebase";
import {collection,getDocs,where,query,addDoc,doc,orderBy,getFirestore,getDoc, onSnapshot, Firestore, setDoc} from 'firebase/firestore'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'



const services={

  addData:(colc:string,data:{})=>{

    return new Promise((resolve,reject)=>{

          addDoc(collection(db,colc),data).then((res)=>{

            resolve(true)

          }).catch((err)=>{

            reject(false)

          })

    })

},

getData:(colc:string)=>{

  return new Promise((resolve,reject)=>{

    let q = query(collection(db,colc))

    getDocs(q).then((res)=>{


      const data:any= []

      res.forEach((i)=>{

          let allData = i.data()

          allData.id=i.id;

          data.push(allData)

      })

      resolve(data)

    }).catch((err)=>{

      reject(err)

    })

  })


},
uploadImage:(img:any)=>{

  return new Promise((resolve,reject)=>{

    if(img===null){

      reject('select file')

    }

    const storageRef = ref(storage,'/files/'+img.name)

    const uploadTask = uploadBytesResumable(storageRef, img);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

      },
      (err) => reject(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              resolve(url)
          });
      }
  ); 

  })

},

}

export default services