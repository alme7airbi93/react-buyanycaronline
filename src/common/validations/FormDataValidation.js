export const FormDataValidation = (data)=>{
    for (const [key, val] of Object.entries(data)) {
        if(val == '' || val == -1){
          return false
        }
      }
    return true;
} 