import React, { useCallback, useRef } from "react";
import type { Engine, Container as ParticlesContainer } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { LoaderArgs } from '@remix-run/server-runtime';
import { ShoppingCartIcon } from '@heroicons/react/outline';

export async function loader({ request }: LoaderArgs) {
    const collections = await getCollections(request);
    return {
        collections,
    };
}

export default function Index() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);
    
    const particlesLoaded = useCallback(async (container: ParticlesContainer | undefined) => {
        await console.log(container);
    }, []);

    const { collections } = useLoaderData<typeof loader>();
    const headerImage = collections[0]?.featuredAsset?.preview;
    return (
        <>
            <div className="relative">
                {/* Decorative image and overlay */}
                <div
                    aria-hidden="true"
                    className="absolute shadow-xl inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-700 to-cyan-900"
                >
                    <Particles
                        className="h-full"
                        loaded={particlesLoaded}
                        init={particlesInit}
                        options={{
                            fullScreen: {
                                enable: false
                            },
                            particles: {
                                number: {
                                    value: 100,
                                    density: {
                                        enable: true,
                                        value_area: 1500
                                    }
                                },
                                line_linked: {
                                    enable: true,
                                    opacity: 0.08
                                },
                                move: {
                                    direction: "bottom",
                                    speed: 0.05
                                },
                                size: {
                                    value: 1.7
                                },
                                opacity: {
                                    anim: {
                                        enable: true,
                                        speed: 1,
                                        opacity_min: 0.1
                                    }
                                }
                            },
                            interactivity: {
                                events: {
                                    onclick: {
                                        enable: true,
                                        mode: "push"
                                    },
                                    onhover: {
                                        enable: true,
                                        mode: "bubble"
                                    }
                                },
                                modes: {
                                    push: {
                                        particles_nb: 1
                                    },
                                    bubble: {
                                        size: 6,
                                        distance: 40
                                    }
                                }
                            },
                            detectRetina: true,
                            fpsLimit: 120,
                        }}
                    />
                </div>
                <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-60 lg:px-0">
                    <div className="relative rounded-lg p-0">
                        <h1 className="font-bold text-6xl text-white bg-clip-text tracking-normal lg:text-6xl">
                            <div className="flex items-center gap-x-3">
                                <p>VHDPlus Shop</p>
                                <ShoppingCartIcon className="h-14 hidden md:block" />
                            </div>   
                        </h1>
                    </div>

                    <p className="mt-4 text-2xl text-white">
                        High quality hardware and software developed with ❤️ in Germany
                    </p>
                </div>
            </div>

            <section
                aria-labelledby="category-heading"
                className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
            >
                <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
                    <h2
                        id="category-heading"
                        className="text-2xl font-light tracking-tight text-gray-900"
                    >
                        Shop by Category
                    </h2>
                </div>

                <div className="mt-4 flow-root">
                    <div className="-my-2">
                        <div className="box-content py-2 px-0 relative overflow-x-auto xl:overflow-visible">
                            <div className="grid justify-items-left grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-0 sm:px-0 lg:px-0 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-0">
                                {collections.map((collection) => (
                                    <CollectionCard
                                        key={collection.id}
                                        collection={collection}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 px-4 sm:hidden">
                    <a
                        href="~/routes/__cart/index#"
                        className="block text-sm font-semibold text-primary-600 hover:text-primary-500"
                    >
                        Browse all categories
                        <span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </section>
        </>
    );
}
