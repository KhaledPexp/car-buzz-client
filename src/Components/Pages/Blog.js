import React, { useContext } from 'react';
import { authProvider } from '../../Context/AuthContext';

const Blog = () => {
    const {darkTheme} = useContext(authProvider);
    return (
        <div>
            <div className='my-5 bg-[#00a5d0] text-white text-center h-24'>
                <div className='h-full flex justify-center items-center text-4xl p-5 font-semibold'>
                    <p>Blog</p>
                </div>
            </div>
            <div className='mt-20 mx-24 px-4 max-md:mx-2'>
                <div className='grid grid-cols-4 py-8 gap-5 border-b'>
                    <div className='leading-5 max-sm:hidden'>
                        <p>REACT</p>
                        <p>7 NOV 2023</p>
                    </div>
                    <div className='col-span-3 max-lg:col-span-3'>
                        <h1 className='font-bold text-4xl'>What are the different ways to manage a state in a React application?</h1>
                        <div className={darkTheme? 'text-white':'text-gray-600'}>
                            <p className='py-5'>The Four Kinds of React State to Manage. There are four main types of state you need to properly manage in your React apps: 1.Local state 2.Global state 3.Server state 4.URL state</p>
                            <ol className='space-y-5'>
                                <li>1. Local (UI) state – Local state is data we manage in one or another component. Local state is most often managed in React using the useState hook.</li>
                                <li>2. Global (UI) state – Global state is data we manage across multiple components. Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.</li>
                                <li>3. Server state – Data that comes from an external server that must be integrated with our UI state. Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.</li>
                                <li>4. URL state – Data that exists on our URLs, including the pathname and query parameters.</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-4 py-8 gap-5 border-b'>
                    <div className='leading-5 max-sm:hidden'>
                        <p>PROTOTYPE INHERITANCE</p>
                        <p>28 NOV 2023</p>
                    </div>
                    <div className='col-span-3'>
                        <h1 className='font-bold text-4xl'>How does prototypical inheritance work?</h1>
                        <div className={darkTheme? 'text-white':'text-gray-600'}>
                            <p className='py-5'>Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.</p>
                            
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-4 py-8 gap-5 border-b'>
                    <div className='leading-5 max-sm:hidden'>
                        <p>UNIT TESTING</p>
                        <p>29 NOV 2023</p>
                    </div>
                    <div className='col-span-3'>
                        <h1 className='font-bold text-4xl'>
                        What is a unit test? Why should we write unit tests?
                        </h1>
                        <div className={darkTheme? 'text-white':'text-gray-600'}>
                            <p className='py-5'>
                            Unit testing is a type of software testing where individual units or software components are tested. Its purpose is to validate that each unit of code performs as expected. A unit can be anything you want it to be — a line of code, a method, or a class.
                            </p>
                            <p>
                            To justify any effort in business, there must be a positive impact on the bottom line. Here are a few benefits to writing unit tests: Unit tests save time and money. Usually, we tend to test the happy path more than the unhappy path. If you release such an app without thorough testing, you would have to keep fixing issues raised by your potential users. The time to fix these issues could’ve been used to build new features or optimize the existing system. Bear in mind that fixing bugs without running tests could also introduce new bugs into the system. Well-written unit tests act as documentation for your code.
                            </p>
                            <p className='py-5'>
                            Any developer can quickly look at your tests and know the purpose of your functions. It simplifies the debugging process. Unit testing is an integral part of extreme programming. Extreme programming is basically a “test-everything-that-can-possibly-break” programming strategy. Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your tests to make sure you have the desired results.
                            </p>
                          
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-4 py-8 gap-5'>
                    <div className='leading-5 max-sm:hidden'>
                        <p>REACT VS ANGULAR</p>
                        <p>30 NOV 2023</p>
                    </div>
                    <div className='col-span-3'>
                        <h1 className='font-bold text-4xl'>
                            React vs. Angular vs. Vue?
                        </h1>
                        <div className={darkTheme? 'text-white':'text-gray-600'}>
                            <p className='py-5'>AngularIt was first released in 2010 and developed by Google. It is a TypeScript based JavaScript framework. After releasing several versions, now, Angular v7 is available which was released on October 2018.</p>
                            <p className='pb-5'>ReactIt was initially released in 2013 by Facebook. Besides, Facebook, it is used by Instagram and WhatsApp. The currently available version is 16.X, which was released on November 2018.</p>
                            <p className='pb-5'>VueVue is the youngest member of the group and also known as Vue.js. It was developed by an ex-Google employee Evan You in 2014. The current stable version is 2.17, which was released on August 2018. Vue's contributors are supported by Patreon.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;