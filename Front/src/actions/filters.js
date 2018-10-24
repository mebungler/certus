export const setTextFilter = (text='') => ({
    type:'SET_TEXT_FILTER',
    text
});

export const sortByDate=()=>({
   type:'SORT_BY_DATE'
});

export const sortByName=()=>({
    type:'SORT_BY_NAME'
});

export const sortByPriority=()=>({
    type:'SORT_BY_PRIORITY'
});


export const setUserTypeFilter=(userType)=>({
    type:'SET_USER_TYPE_FILTER',
    userType
});
