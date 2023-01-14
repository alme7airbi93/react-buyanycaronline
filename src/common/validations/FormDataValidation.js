export const FormDataValidation = (data)=>{
  console.log(data);
    for (const [key, val] of Object.entries(data)) {
        if(val == '' || val == -1){
           return {error:true,errorField:key}
        }
      }
    return {error:false};
} 