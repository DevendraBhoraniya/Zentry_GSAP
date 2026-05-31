import { useEffect, useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

const TOTAL_VIDEOS = 4;
const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    // FIX 1: Separate refs for current (mini) and next (expanding) videos
    const currentVideoRef = useRef<HTMLVideoElement>(null);
    const nextVideoRef = useRef<HTMLVideoElement>(null);

    const upcomingVideoIndex = (currentIndex % TOTAL_VIDEOS) + 1;

    const handleVideoLoad = () => {
        setLoadedVideos(prev => prev + 1);
    };

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    };

    // FIX 2: Correct loading threshold — 3 videos render, each fires onLoadedData once
    useEffect(() => {
        if (loadedVideos >= TOTAL_VIDEOS - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    // FIX 3: Cleanup — pause videos on unmount to free decoder resources
    useEffect(() => {
        return () => {
            currentVideoRef.current?.pause();
            nextVideoRef.current?.pause();
        };
    }, []);

    useGSAP(() => {
        if (!hasClicked) return;

        gsap.set('#next-video', { visibility: 'visible', scale: 0 });

        gsap.to('#next-video', {
            transformOrigin: 'center center',
            scale: 1,
            width: '100%',
            height: '100%',
            duration: 1,
            ease: 'power1.inOut',
            // FIX 4: Use the correct ref — nextVideoRef now actually points to #next-video
            onStart: () => nextVideoRef.current?.play(),
        });

        gsap.from('#current-video', {
            transformOrigin: 'center center',
            scale: 0,
            duration: 1,
            ease: 'power1.inOut',
        });
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(26% 13%, 75% 7%, 92% 93%, 13% 80%)",
            borderRadius: "10% 10% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    // FIX 5: Empty deps — this scroll animation only needs to run once on mount
    }, { dependencies: [] });

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}

            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                <div>
                    {/* Mini video preview — shown on hover, triggers transition on click */}
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div
                            onClick={handleMiniVdClick}
                            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                        >
                            <video
                                // FIX 6: Correct ref — currentVideoRef for the mini/current video
                                ref={currentVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                // FIX 7: preload metadata so first frame is ready without full download
                                preload="metadata"
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    {/* Expanding next video — animates to fullscreen on click */}
                    <video
                        // FIX 8: Correct ref — nextVideoRef for the expanding video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        preload="metadata"
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />

                    {/* FIX 9: Background video always uses currentIndex (was buggy: skipped video 4) */}
                    <video
                        src={getVideoSrc(currentIndex)}
                        autoPlay
                        loop
                        muted
                        // FIX 10: preload auto for the bg video since it autoplays immediately
                        preload="auto"
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>A</b>MING
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-75">
                            redefi<b>n</b>e
                        </h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-75">
                            Enter the Metagame Layer
                            <br />
                            Unleash the Play Economy
                        </p>
                        <Button
                            id="watch-trailer"
                            title="Watch Trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="!bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G<b>A</b>MING
            </h1>
        </div>
    );
};

export default Hero;