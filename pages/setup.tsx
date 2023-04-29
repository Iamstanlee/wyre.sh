import SetupSteps from '@/components/SetupSteps';
import withLoading from '@/utils/with-loading';

function SetupPage() {
  return (
    <div>
      <section className="min-h-screen flex bg-white text-primary-text pt-8 pb-3 sm:px-4 md:px-8 xl:px-11">
        <div className="max-w-3xl mx-auto h-fit">
          <div className=" mb-12">
            <h1 className="text-4xl font-bold text-black text-center">
              Setup your account
            </h1>
            <p className="text-center text-sm mt-2 mb-4">
              This will only take a few minutes.
            </p>
          </div>
          <SetupSteps />
        </div>
      </section>
    </div>
  );
}

export default withLoading(SetupPage);
