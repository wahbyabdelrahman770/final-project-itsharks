import Loading from "./Loading";

const ContentLoading = ({ children, loading }) => {
    if (loading) {
        return <Loading />;
    }
    return children;
};

export default ContentLoading;