import React, { useState, useEffect, useContext } from 'react';
import './Homepage.scss';
import { withRouter, Link } from 'react-router-dom';
import { Store } from '../../App'; 
import Loader from '../../components/Loader/Loader';
import Story from '../../components/Story/Story';
import ErrorPage from '../ErrorPage/ErrorPage';

const queryString = require('query-string');


const Homepage = props => {
    const {store} = useContext(Store);
    const [page, setPage] = useState(+queryString.parse(props.location.search).page);
    const [results, setResults] = useState([]);
    
    useEffect(() => {
        // Setting page on change
        setPage(+queryString.parse(props.location.search).page);
         
        // Setting 30 results to be displayed on page according to page number displayed in URL
        let currentPage = queryString.parse(props.location.search).page ? +queryString.parse(props.location.search).page : 1;
        let index = currentPage === 1 ? 29 : (currentPage * 30 - 1);
        let stories = store.stories.slice(index - 29, index + 1);
 
        let arr = [];

        // Getting all info of each top story by its ID
        stories.map((storyID) => (
            fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
            .then(response => response.json())
            .then(result => {

                // Setting story number to put them in order
                let index = store.stories.findIndex(story => story === result.id);
                result.index = index + 1;
                arr.push(result);


                // Checking if last result will be displayed on page. If not, 30 results must be shown
                let last = arr.find(((story) => story.index === store.total));

                if (arr.length === 30 || last) {
                    arr.sort((a,b) => a.index - b.index);
                    setResults(arr);
                }
            })
        ))
        // eslint-disable-next-line
    }, [props.location.search, store.stories.length]);

    const pageChanged = () => {
        setResults([]);
        window.scroll({top: 0, behavior: 'smooth'});
    }

    const renderPrevPageButton = () => {
        // 'Previous Page' button is not rendered on the first page
        let first = results.find(story => story.index === 1);
        
        if (!first) {
            return (
                <Link 
                    to={`/news?page=${page > 1 ? page - 1 : 1}`} 
                    exact='true'
                    title='Previous page'
                    onClick={pageChanged}>
                    <button 
                        className='btn homepage-btn'>
                            PREVIOUS PAGE
                    </button>
                </Link>
            )
        }
    }

    const renderNextPageButton = () => {
        // 'Next Page' button is rendered on all pages except the last one.
        let last = results.find(story => story.index === store.total);
        
        
        if (!last) {
            return (
                <Link 
                    to={`/news?page=${page ? page + 1: 2}`} 
                    onClick={pageChanged}
                    exact='true'
                    title='Next page'>
                    <button 
                        className='btn homepage-btn'>
                            NEXT PAGE
                    </button>
                </Link>
            )
        }       
    }

    const renderPageContent = () => {
        // Rendering content depending on results. All cases are covered
        if (results.length) {
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-8 mx-auto'>
                            <h1 className='text-center mb-4'>Hacker News</h1>

                                <div className='stories'>
                                    {results.map((story, i) => (
                                        <Story key={story.id} data={story} storyNumber={i + 1} />
                                    ))}
                                </div>
                                
                            <div className='btns d-flex justify-content-center my-5'>
                                {renderPrevPageButton()}
                                {renderNextPageButton()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (!store.stories.length || (store.stories.length && !results.length && !page) || (!results.length && Math.ceil(store.total / 30) >= page)) {
            return <Loader />
        } else if (Math.ceil(store.total / 30) < page) {
            return <ErrorPage />
        } 
    }

    return (
        <section className='homepage'>
            {renderPageContent()}
        </section>
    )
}


export default withRouter(Homepage);