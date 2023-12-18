import React, { useState, useEffect }from 'react';

const Loading = (WrappedComponent) => {
    return (props) => {
        const [loading, setLoading] = useState(true);

        useEffect(()=>{
            const fakeSync = () => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
            fakeSync();

        }, []);
        return loading? <p>Loading...</p> : <WrappedComponent {...props} />
    }
}
export default Loading;