import JsonLdArticle from '@/components/JsonLdArticle';

export default function MLDeploymentBlog() {
  return (
   <article className="max-w-4xl mx-auto px-4 pt-24 pb-8 sm:px-6 lg:px-8">
      <JsonLdArticle
        headline="Deploying ML Models with Spring Boot and TensorFlow/ONNX"
        description="Learn how to serve machine learning models in production using Spring Boot. We cover exporting models to ONNX, running inference in Java, and optimizing for high throughput."
        datePublished="2025-12-11"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/deploying-ml-models-spring-boot-tensorflow"
      />
      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Deploying ML Models with Spring Boot and TensorFlow/ONNX
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <time dateTime="2025-12-11">December 11, 2025</time>
          <span>•</span>
          <span>22 min read</span>
          <span>•</span>
          <span>MLOps, Spring Boot, ONNX</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          While Python rules the training phase of Machine Learning, Java and Spring Boot often rule the production backend.
          Deploying models directly in your Java application can reduce latency and simplify infrastructure.
          In this guide, we&apos;ll use the ONNX (Open Neural Network Exchange) format to bridge the gap.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Jump to Section</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-600 dark:text-blue-400">
            <li><a href="#why-java" className="hover:underline">→ Why Java for Inference?</a></li>
            <li><a href="#export-onnx" className="hover:underline">→ Exporting Models to ONNX</a></li>
            <li><a href="#onnx-runtime" className="hover:underline">→ Setting up ONNX Runtime</a></li>
            <li><a href="#inference-service" className="hover:underline">→ Building the Inference Service</a></li>
            <li><a href="#performance" className="hover:underline">→ Performance Tuning</a></li>
            <li><a href="#security" className="hover:underline">→ Security Considerations</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">

        {/* Why Java */}
        <section id="why-java" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Java for Inference?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
             Python services (Flask/FastAPI) are common for ML, but if your core business logic is in Spring Boot, adding a Python sidecar adds network latency and operational complexity.
             Running the model in-process (within the JVM) offers:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Zero Network Latency:</strong> No HTTP hop between app and model.</li>
            <li><strong>Simplified Ops:</strong> Single deployment artifact (JAR/Docker image).</li>
            <li><strong>Robust Concurrency:</strong> Leverage Java&apos;s mature threading model.</li>
          </ul>
        </section>

        {/* Export ONNX */}
        <section id="export-onnx" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Exporting Models to ONNX</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            ONNX is an open standard for machine learning interoperability. Most frameworks (PyTorch, TensorFlow, Scikit-Learn) support exporting to &apos;.onnx&apos;.
          </p>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`# Python: Exporting a Scikit-Learn model
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

initial_type = [('float_input', FloatTensorType([None, 4]))]
onx = convert_sklearn(clf, initial_types=initial_type)
with open("model.onnx", "wb") as f:
    f.write(onx.SerializeToString())`}</code></pre>
          </div>
        </section>

        {/* ONNX Runtime */}
        <section id="onnx-runtime" className="mb-12">
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Setting up ONNX Runtime in Java</h2>
           <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
             Microsoft maintains a high-performance Java API for ONNX Runtime. Add the dependency:
           </p>
           <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`<dependency>
    <groupId>com.microsoft.onnxruntime</groupId>
    <artifactId>onnxruntime</artifactId>
    <version>1.17.0</version>
</dependency>`}</code></pre>
          </div>
        </section>

        {/* Inference Service */}
        <section id="inference-service" className="mb-12">
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Building the Inference Service</h2>
           <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
             We wrap the ONNX session in a Spring Service. We load the model only once at startup.
           </p>
           <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`@Service
public class PredictionService implements AutoCloseable {

    private final OrtEnvironment env;
    private final OrtSession session;

    public PredictionService(@Value("\${model.path}") String modelPath) throws OrtException {
        this.env = OrtEnvironment.getEnvironment();
        this.session = env.createSession(modelPath, new OrtSession.SessionOptions());
    }

    public float predict(float[] inputData) throws OrtException {
        // 1. Create Tensor
        OnnxTensor tensor = OnnxTensor.createTensor(env, FloatBuffer.wrap(inputData), new long[]{1, inputData.length});

        // 2. Run Inference
        try (Result result = session.run(Map.of("float_input", tensor))) {
            float[][] output = (float[][]) result.get(0).getValue();
            return output[0][0]; // Return first prediction
        }
    }

    @Override
    public void close() throws OrtException {
        session.close();
        env.close();
    }
}`}</code></pre>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Security Considerations</h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Loading external binary files (models) into your application memory poses unique security risks.
            &quot;Pickle bombs&quot; are famous in Python, but ONNX files are generally safer as they are protobuf-based graphs. However, risks remain.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
              ML Model Security Checklist
            </h3>
            <ul className="space-y-2 text-yellow-900 dark:text-yellow-100">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Model Provenance:</strong> Only load models from trusted sources. Verify the SHA256 checksum of the `.onnx` file before loading.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Input Validation:</strong> ML models are sensitive to malformed inputs (NaNs, Infinities, extreme outliers). Validate all numerical inputs before tensor creation to prevent crashes or undefined behavior.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Resource Exhaustion:</strong> Models can be memory-intensive. Set strict heap limits and monitor off-heap memory usage (ONNX Runtime uses native memory).</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Adversarial Attacks:</strong> Be aware that models can be tricked by subtly perturbed inputs. Implement rate limiting and anomaly detection on the input distribution.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Conclusion</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
             Deploying ML models in Spring Boot using ONNX Runtime is a powerful pattern for high-performance, low-latency AI applications.
             It simplifies your architecture by removing the need for separate Python microservices for inference.
          </p>
        </section>

        {/* Author Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Written by the DevMetrix Team • Published December 11, 2025
          </p>
        </div>

      </div>
    </article>
  );
}
