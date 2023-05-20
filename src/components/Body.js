import { useEffect, useState } from "react"
import { db } from '../firebase';
import { getDocs, addDoc, deleteDoc, collection, doc } from 'firebase/firestore'
import './Body.css'
export const Body = () => {
    const [movie, setMovie] = useState("");
    const [release, setRelease] = useState("");
    const [isOscar, setIsOscar] = useState(false)
    const [movieList, setMovieList] = useState([]);
    // console.log(movie)
    const movieRef = collection(db, "movies");
    const getMoviesList = async () => {
        try {
            const data = await getDocs(movieRef);
            const filteredData = data.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            setMovieList(filteredData);
            // console.log(filteredData);
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("submitted")
        try {

            await addDoc(movieRef, {
                Movie: movie,
                releaseDate: release,
                isOscar: isOscar
            })
            getMoviesList();
            setMovie("")
            setRelease("")
            setIsOscar(false)
        }
        catch (error) {
            console.log(error)
        }
    }
    const deleteMovie = async (id) => {
        const movieDelete = doc(db, "movies", id);
        await deleteDoc(movieDelete);
        getMoviesList();
    }
    useEffect(() => {
        getMoviesList();
    }, [])
    console.log("re")
    return (
        <div className='body-div'>
            <form onSubmit={handleSubmit}>
                <div className="form-div">
                    <input type="text" name="movieName" value={movie} onChange={(e) => setMovie(e.target.value)} placeholder="Enter Movie Name" />
                </div>
                <div className="form-div">
                    <input type="number" name="releaseDate" value={release} onChange={(e) => setRelease(e.target.value)} placeholder="Enter Releasing Year" />
                </div>
                <div className="form-div">
                    <input type="checkbox" checked={isOscar} onChange={(e) => setIsOscar(e.target.checked)} />
                    <label>Won Oscar?</label>
                </div>
                <div className="form-div" id="btn">
                    <button id="upload">Upload</button>
                </div>
            </form>
            <div id="movie">
                {movieList.map((list) => {
                    return (
                        <div key={list.id} className="moive-map">
                            <h1 style={{ color: list.isOscar ? 'green' : 'red' }}>{list.Movie}</h1>
                            <h3>{list.releaseDate}</h3>
                            <button onClick={() => deleteMovie(list.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}