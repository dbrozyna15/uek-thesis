import { useRouter } from 'next/router'
const BackButton = ({src}) => {
    const router = useRouter()
    return (
        <button onClick={() => router.push(src)} className="mb-2 w-1/6 rounded-2xl bg-black text-center text-white">back</button>
    )
}

export default BackButton;