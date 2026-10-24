'use client';

import React from 'react';

export default function ScriptReference() {
  return (
    <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
        Gatling DSL Reference
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <strong className="text-violet-600 dark:text-violet-400 block mb-1">Structure</strong>
          <pre className="font-mono text-[10px] overflow-x-auto">
{`class MySim extends Simulation {
  val httpProtocol = http.baseUrl("...")
  val scn = scenario("Name").exec(...)
  setUp(scn.inject(...)).protocols(httpProtocol)
}`}
          </pre>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <strong className="text-violet-600 dark:text-violet-400 block mb-1">Injection</strong>
          <pre className="font-mono text-[10px] overflow-x-auto">
{`atOnceUsers(10)
rampUsers(10).during(10)
constantUsersPerSec(20).during(15)
rampUsersPerSec(10).to(20).during(10)`}
          </pre>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <strong className="text-violet-600 dark:text-violet-400 block mb-1">Requests</strong>
          <pre className="font-mono text-[10px] overflow-x-auto">
{`http("Req Name")
  .get("/path")
  .header("Content-Type", "application/json")
  .check(status.is(200))
  .check(jsonPath("$.id").saveAs("userId"))`}
          </pre>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <strong className="text-violet-600 dark:text-violet-400 block mb-1">Logic</strong>
          <pre className="font-mono text-[10px] overflow-x-auto">
{`pause(5)
repeat(5) { ... }
doIf("\${flag}") { ... }
randomSwitch(
  50.0 -> exec(...),
  50.0 -> exec(...)
)`}
          </pre>
        </div>
      </div>
    </div>
  );
}
