export interface HttpStatusInfo {
  code: number;
  title: string;
  category: '1xx' | '2xx' | '3xx' | '4xx' | '5xx';
  categoryLabel: string;
  description: string;
  concise: string;
  exampleRequest: string;
  exampleResponse: string;
  developerGuide: {
    meaning: string;
    fix: string;
    retry: 'None' | 'Immediate' | 'Exponential Backoff' | 'Manual Intervention';
  };
  related: number[];
}

export const httpStatusData: HttpStatusInfo[] = [
  // 1xx Informational
  {
    code: 100,
    title: 'Continue',
    category: '1xx',
    categoryLabel: 'Informational',
    description: 'The server has received the request headers and the client should proceed to send the request body.',
    concise: 'Headers received, proceed with body.',
    exampleRequest: 'POST /large-file HTTP/1.1\nHost: api.example.com\nExpect: 100-continue\nContent-Length: 1024000',
    exampleResponse: 'HTTP/1.1 100 Continue',
    developerGuide: {
      meaning: 'Server is ready for the payload.',
      fix: 'Client should send the body.',
      retry: 'None'
    },
    related: [101]
  },
  {
    code: 101,
    title: 'Switching Protocols',
    category: '1xx',
    categoryLabel: 'Informational',
    description: 'The requester has asked the server to switch protocols and the server has agreed to do so.',
    concise: 'Switching to a new protocol (e.g., WebSocket).',
    exampleRequest: 'GET /chat HTTP/1.1\nHost: example.com\nUpgrade: websocket\nConnection: Upgrade',
    exampleResponse: 'HTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade',
    developerGuide: {
      meaning: 'Protocol handshake successful.',
      fix: 'Proceed with new protocol communication.',
      retry: 'None'
    },
    related: [100]
  },

  // 2xx Success
  {
    code: 200,
    title: 'OK',
    category: '2xx',
    categoryLabel: 'Success',
    description: 'The request has succeeded. The meaning of the success depends on the HTTP method.',
    concise: 'Standard response for successful requests.',
    exampleRequest: 'GET /api/users/1 HTTP/1.1',
    exampleResponse: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{ "id": 1, "name": "Alice" }',
    developerGuide: {
      meaning: 'Operation completed successfully.',
      fix: 'None needed.',
      retry: 'None'
    },
    related: [201, 204]
  },
  {
    code: 201,
    title: 'Created',
    category: '2xx',
    categoryLabel: 'Success',
    description: 'The request has succeeded and a new resource has been created as a result.',
    concise: 'Resource created successfully.',
    exampleRequest: 'POST /api/users HTTP/1.1\nContent-Type: application/json\n\n{ "name": "Bob" }',
    exampleResponse: 'HTTP/1.1 201 Created\nLocation: /api/users/2\n\n{ "id": 2, "name": "Bob" }',
    developerGuide: {
      meaning: 'Resource creation confirmed.',
      fix: 'Check "Location" header for the new resource URL.',
      retry: 'None'
    },
    related: [200, 202]
  },
  {
    code: 202,
    title: 'Accepted',
    category: '2xx',
    categoryLabel: 'Success',
    description: 'The request has been received but not yet acted upon. It is non-committal.',
    concise: 'Request accepted for processing.',
    exampleRequest: 'POST /api/jobs/batch-process HTTP/1.1',
    exampleResponse: 'HTTP/1.1 202 Accepted\nLocation: /api/jobs/status/123',
    developerGuide: {
      meaning: 'Processing started/queued.',
      fix: 'Poll the status endpoint later.',
      retry: 'None'
    },
    related: [201]
  },
  {
    code: 204,
    title: 'No Content',
    category: '2xx',
    categoryLabel: 'Success',
    description: 'The server successfully processed the request and is not returning any content.',
    concise: 'Success, but no body returned.',
    exampleRequest: 'DELETE /api/users/1 HTTP/1.1',
    exampleResponse: 'HTTP/1.1 204 No Content',
    developerGuide: {
      meaning: 'Action done, no data to show.',
      fix: 'Update UI to reflect deletion/update.',
      retry: 'None'
    },
    related: [200]
  },

  // 3xx Redirection
  {
    code: 301,
    title: 'Moved Permanently',
    category: '3xx',
    categoryLabel: 'Redirection',
    description: 'The URL of the requested resource has been changed permanently. The new URL is given in the response.',
    concise: 'Resource has moved permanently.',
    exampleRequest: 'GET /old-page HTTP/1.1',
    exampleResponse: 'HTTP/1.1 301 Moved Permanently\nLocation: /new-page',
    developerGuide: {
      meaning: 'Old URL is deprecated.',
      fix: 'Update all links and bookmarks to the new URL.',
      retry: 'Immediate' // Browser handles this
    },
    related: [302, 308]
  },
  {
    code: 302,
    title: 'Found',
    category: '3xx',
    categoryLabel: 'Redirection',
    description: 'The URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future.',
    concise: 'Resource moved temporarily.',
    exampleRequest: 'GET /temp-page HTTP/1.1',
    exampleResponse: 'HTTP/1.1 302 Found\nLocation: /maintenance-page',
    developerGuide: {
      meaning: 'Temporary detour.',
      fix: 'Follow redirect, but keep using original URL.',
      retry: 'Immediate'
    },
    related: [301, 307]
  },
  {
    code: 304,
    title: 'Not Modified',
    category: '3xx',
    categoryLabel: 'Redirection',
    description: 'Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.',
    concise: 'Cached version is still valid.',
    exampleRequest: 'GET /logo.png HTTP/1.1\nIf-None-Match: "v1"',
    exampleResponse: 'HTTP/1.1 304 Not Modified',
    developerGuide: {
      meaning: 'Use local cache.',
      fix: 'No body returned; load from cache.',
      retry: 'None'
    },
    related: [200]
  },
  {
    code: 307,
    title: 'Temporary Redirect',
    category: '3xx',
    categoryLabel: 'Redirection',
    description: 'The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request.',
    concise: 'Temporary redirect, keep method (POST->POST).',
    exampleRequest: 'POST /login HTTP/1.1',
    exampleResponse: 'HTTP/1.1 307 Temporary Redirect\nLocation: /auth/login',
    developerGuide: {
      meaning: 'Resubmit request to new URL.',
      fix: 'Follow redirect preserving method and body.',
      retry: 'Immediate'
    },
    related: [302, 308]
  },
  {
    code: 308,
    title: 'Permanent Redirect',
    category: '3xx',
    categoryLabel: 'Redirection',
    description: 'This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header.',
    concise: 'Permanent redirect, keep method.',
    exampleRequest: 'POST /old-api HTTP/1.1',
    exampleResponse: 'HTTP/1.1 308 Permanent Redirect\nLocation: /new-api',
    developerGuide: {
      meaning: 'API endpoint moved forever.',
      fix: 'Update client config; preserve method on redirect.',
      retry: 'Immediate'
    },
    related: [301, 307]
  },

  // 4xx Client Error
  {
    code: 400,
    title: 'Bad Request',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax).',
    concise: 'Invalid request sent by client.',
    exampleRequest: 'POST /api/users HTTP/1.1\n{ "invalid-json": ... }',
    exampleResponse: 'HTTP/1.1 400 Bad Request\n\n{ "error": "Invalid JSON syntax" }',
    developerGuide: {
      meaning: 'Client sent garbage or missing data.',
      fix: 'Validate request parameters and body format.',
      retry: 'None'
    },
    related: [422]
  },
  {
    code: 401,
    title: 'Unauthorized',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.',
    concise: 'Authentication required or failed.',
    exampleRequest: 'GET /api/admin HTTP/1.1',
    exampleResponse: 'HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer realm="access"',
    developerGuide: {
      meaning: 'Who are you?',
      fix: 'Provide valid credentials (API Key, Bearer Token).',
      retry: 'Manual Intervention'
    },
    related: [403]
  },
  {
    code: 403,
    title: 'Forbidden',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource.',
    concise: 'Authenticated, but access denied.',
    exampleRequest: 'GET /api/secret-data HTTP/1.1\nAuthorization: Bearer valid_token',
    exampleResponse: 'HTTP/1.1 403 Forbidden\n\n{ "error": "Insufficient scope" }',
    developerGuide: {
      meaning: 'You are logged in, but not allowed here.',
      fix: 'Request higher privileges or check RBAC.',
      retry: 'None'
    },
    related: [401]
  },
  {
    code: 404,
    title: 'Not Found',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.',
    concise: 'Resource does not exist.',
    exampleRequest: 'GET /api/users/99999 HTTP/1.1',
    exampleResponse: 'HTTP/1.1 404 Not Found',
    developerGuide: {
      meaning: 'URL is wrong or resource deleted.',
      fix: 'Check URL path and resource ID.',
      retry: 'None'
    },
    related: [410]
  },
  {
    code: 405,
    title: 'Method Not Allowed',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST.',
    concise: 'HTTP method not supported for this URL.',
    exampleRequest: 'DELETE /api/users HTTP/1.1',
    exampleResponse: 'HTTP/1.1 405 Method Not Allowed\nAllow: GET, POST',
    developerGuide: {
      meaning: 'You cannot use this verb here.',
      fix: 'Check API docs for allowed methods (Allow header).',
      retry: 'None'
    },
    related: [400]
  },
  {
    code: 408,
    title: 'Request Timeout',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'The server timed out waiting for the request. According to HTTP specifications: "The client did not produce a request within the time that the server was prepared to wait."',
    concise: 'Client took too long to send request.',
    exampleRequest: 'POST /upload HTTP/1.1\n(Network stall...)',
    exampleResponse: 'HTTP/1.1 408 Request Timeout',
    developerGuide: {
      meaning: 'Connection too slow.',
      fix: 'Improve network connection or increase timeout.',
      retry: 'Exponential Backoff'
    },
    related: [504]
  },
  {
    code: 409,
    title: 'Conflict',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict.',
    concise: 'Conflict with current state (e.g., duplicate).',
    exampleRequest: 'POST /api/signup HTTP/1.1\n{ "email": "existing@email.com" }',
    exampleResponse: 'HTTP/1.1 409 Conflict\n\n{ "error": "Email already exists" }',
    developerGuide: {
      meaning: 'State conflict prevents action.',
      fix: 'Resolve conflict (e.g., use different email).',
      retry: 'None'
    },
    related: [422]
  },
  {
    code: 410,
    title: 'Gone',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'Indicates that the resource requested is no longer available and will not be available again.',
    concise: 'Resource permanently deleted.',
    exampleRequest: 'GET /api/v1/deprecated-endpoint HTTP/1.1',
    exampleResponse: 'HTTP/1.1 410 Gone',
    developerGuide: {
      meaning: 'It was here, but now it\'s gone forever.',
      fix: 'Remove references to this resource.',
      retry: 'None'
    },
    related: [404]
  },
  {
    code: 413,
    title: 'Payload Too Large',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'The request is larger than the server is willing or able to process.',
    concise: 'Request body is too big.',
    exampleRequest: 'POST /upload HTTP/1.1\nContent-Length: 10000000000',
    exampleResponse: 'HTTP/1.1 413 Payload Too Large',
    developerGuide: {
      meaning: 'Upload exceeds server limit.',
      fix: 'Chunk file or increase server limit.',
      retry: 'None'
    },
    related: [400]
  },
  {
    code: 415,
    title: 'Unsupported Media Type',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'The request entity has a media type which the server or resource does not support.',
    concise: 'Unsupported content format (e.g., XML instead of JSON).',
    exampleRequest: 'POST /api/json-only HTTP/1.1\nContent-Type: application/xml',
    exampleResponse: 'HTTP/1.1 415 Unsupported Media Type',
    developerGuide: {
      meaning: 'Wrong Content-Type.',
      fix: 'Use supported Content-Type (e.g., application/json).',
      retry: 'None'
    },
    related: [400]
  },
  {
    code: 422,
    title: 'Unprocessable Entity',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'The request was well-formed but was unable to be followed due to semantic errors.',
    concise: 'Validation failed (logic error).',
    exampleRequest: 'POST /transfer HTTP/1.1\n{ "amount": -50 }',
    exampleResponse: 'HTTP/1.1 422 Unprocessable Entity\n{ "error": "Amount must be positive" }',
    developerGuide: {
      meaning: 'Business logic validation failed.',
      fix: 'Correct data to meet validation rules.',
      retry: 'None'
    },
    related: [400]
  },
  {
    code: 429,
    title: 'Too Many Requests',
    category: '4xx',
    categoryLabel: 'Client Error',
    description: 'The user has sent too many requests in a given amount of time ("rate limiting").',
    concise: 'Rate limit exceeded.',
    exampleRequest: 'GET /api/data HTTP/1.1\n(100th request in 1 second)',
    exampleResponse: 'HTTP/1.1 429 Too Many Requests\nRetry-After: 60',
    developerGuide: {
      meaning: 'Slow down.',
      fix: 'Respect Retry-After header.',
      retry: 'Exponential Backoff'
    },
    related: [503]
  },

  // 5xx Server Error
  {
    code: 500,
    title: 'Internal Server Error',
    category: '5xx',
    categoryLabel: 'Server Error',
    description: 'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.',
    concise: 'Server crashed or failed.',
    exampleRequest: 'GET /api/buggy-endpoint HTTP/1.1',
    exampleResponse: 'HTTP/1.1 500 Internal Server Error',
    developerGuide: {
      meaning: 'Something went wrong on the server.',
      fix: 'Check server logs for exceptions.',
      retry: 'Exponential Backoff'
    },
    related: [502, 503]
  },
  {
    code: 502,
    title: 'Bad Gateway',
    category: '5xx',
    categoryLabel: 'Server Error',
    description: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
    concise: 'Upstream server failed.',
    exampleRequest: 'GET /proxy HTTP/1.1',
    exampleResponse: 'HTTP/1.1 502 Bad Gateway',
    developerGuide: {
      meaning: 'Proxy cannot reach upstream.',
      fix: 'Check upstream service health.',
      retry: 'Exponential Backoff'
    },
    related: [500, 504]
  },
  {
    code: 503,
    title: 'Service Unavailable',
    category: '5xx',
    categoryLabel: 'Server Error',
    description: 'The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.',
    concise: 'Server is down or overloaded.',
    exampleRequest: 'GET /api/data HTTP/1.1',
    exampleResponse: 'HTTP/1.1 503 Service Unavailable\nRetry-After: 120',
    developerGuide: {
      meaning: 'Maintenance or overload.',
      fix: 'Wait and retry later.',
      retry: 'Exponential Backoff'
    },
    related: [429, 500]
  },
  {
    code: 504,
    title: 'Gateway Timeout',
    category: '5xx',
    categoryLabel: 'Server Error',
    description: 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.',
    concise: 'Upstream server timed out.',
    exampleRequest: 'GET /slow-query HTTP/1.1',
    exampleResponse: 'HTTP/1.1 504 Gateway Timeout',
    developerGuide: {
      meaning: 'Upstream is too slow.',
      fix: 'Optimize upstream query or increase timeout.',
      retry: 'Exponential Backoff'
    },
    related: [408, 502]
  }
];
