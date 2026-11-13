import { useMovieDetails } from "../../contexts/Movie/MovieDetailsProvider";

const titleClass = "text-[#969da9] tracking-[1px] text-[8px] uppercase";
const dataClass = "text-[12px] font-semibold text-white mt-1";
const divClass = "w-full pb-2.5 flex flex-col justify-start border-b-[0.5px] border-b-[#ffffff1a]";

const ProductionDetails = () => {
    const { movieDetails, formattedDate, director, revenue, budget, language, production_companies } = useMovieDetails();

    return (
        <div className="w-[94%] mx-auto mt-12 mb-4 p-12 bg-[#121722]">
            <div className="grid grid-cols-3 justify-items-center gap-4">
                <section className="w-full">
                    <p className="text-[#e50924] uppercase text-[11px] font-bold tracking-[2px]">Production Details</p>
                    <h1 className="mt-6 font-serif text-4xl text-white font-semibold">Movie Information</h1>
                </section>

                <section className="w-[85%] space-y-5">
                    <div className={divClass}>
                        <span className={titleClass}>Release Date</span>
                        <p className={dataClass}>{formattedDate}</p>
                    </div>

                    <div className={divClass}>
                        <span className={titleClass}>Director</span>
                        <p className={dataClass}>{director}</p>
                    </div>

                    <div className={divClass}>
                        <span className={titleClass}>Revenue</span>
                        <p className={dataClass}>{revenue}</p>
                    </div>

                    <div className={divClass}>
                        <span className={titleClass}>Countries</span>
                        <div className="flex flex-row justify-start items-center flex-wrap gap-4">{movieDetails?.production_countries ? (movieDetails.production_countries).map(country => <p key={country.name} className={dataClass}>{country.name}</p>) : ""}</div>
                    </div>
                </section>

                <section className="w-[85%] space-y-5">
                    <div className={divClass}>
                        <span className={titleClass}>Runtime</span>
                        <p className={dataClass}>{movieDetails.runtime} min</p>
                    </div>

                    <div className={divClass}>
                        <span className={titleClass}>Budget</span>
                        <p className={dataClass}>{budget}</p>
                    </div>

                    <div className={divClass}>
                        <span className={titleClass}>Status</span>
                        <p className={dataClass}>{movieDetails?.status}</p>
                    </div>

                    <div className={divClass}>
                        <span className={titleClass}>Language</span>
                        <p className={dataClass}>{language}</p>
                    </div>
                </section>
            </div>

            <div className="mt-16 pt-6 border-t-[0.5px] border-t-[#ffffff1a] flex flex-row items-center justify-start gap-x-7">
                <span className={`${titleClass} w-[10%]`}>Produced By</span>
                {/* <p className="text-[14px] font-semibold text-white uppercase">placeholder</p> */}
                <div className="flex flex-row justify-start items-center flex-wrap gap-8">
                    {production_companies && production_companies.map(company => <p key={company.name} className="text-[14px] font-semibold text-white uppercase">{company.name}</p>)}
                </div>
            </div>
        </div>
    );
};

export default ProductionDetails;