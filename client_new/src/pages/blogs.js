import React from 'react';
import { useStoreState  } from 'easy-peasy';
const Blogs = () => {
const message = useStoreState((state) => state.message)
console.log(message,"at blog")
const file = useStoreState((state) => state.file)
	return (
	<h1>You can write your blogs!{message}<hr></hr>{file.text}</h1>
);
};

export default Blogs;
