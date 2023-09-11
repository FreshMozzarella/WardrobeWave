export async function createOrUpdateCart(cartRequest){
    const createOrUpdateResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/cart`, {
        method:'POST',
        body:JSON.stringify(cartRequest), 
        headers:{
            'Content-Type':"application/json"
        }
    });
    if(createOrUpdateResponse.ok){
        return createOrUpdateResponse.json(); 
    }
}


export async function destroy(userId){
    try{
        const deleteResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/:${userId}`,{method:'DELETE'})
        if(deleteResponse?.ok){
            console.log('converting to json');
            return true;
        }
        else{
            throw new Error('invalid request')
        }
    }
    catch(error){
        throw new Error(error);
    }
}