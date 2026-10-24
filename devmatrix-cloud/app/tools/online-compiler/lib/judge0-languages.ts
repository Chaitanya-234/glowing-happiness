export interface Language {
  id: number;
  name: string;
  is_archived: boolean;
  source_file: string;
  compile_cmd: string | null;
  run_cmd: string | null;
  category: 'Popular' | 'Web' | 'Scripting' | 'Systems' | 'Other';
  extension: string;
}

export const languages: Language[] = [
  // Popular Languages
  { id: 63, name: 'JavaScript (Node.js 12.14.0)', is_archived: false, source_file: 'main.js', compile_cmd: null, run_cmd: 'node main.js', category: 'Popular', extension: 'js' },
  { id: 74, name: 'TypeScript (3.7.4)', is_archived: false, source_file: 'main.ts', compile_cmd: 'tsc main.ts', run_cmd: 'node main.js', category: 'Popular', extension: 'ts' },
  { id: 71, name: 'Python (3.8.1)', is_archived: false, source_file: 'main.py', compile_cmd: null, run_cmd: 'python3 main.py', category: 'Popular', extension: 'py' },
  { id: 62, name: 'Java (OpenJDK 13.0.1)', is_archived: false, source_file: 'Main.java', compile_cmd: 'javac Main.java', run_cmd: 'java Main', category: 'Popular', extension: 'java' },
  { id: 50, name: 'C (GCC 9.2.0)', is_archived: false, source_file: 'main.c', compile_cmd: 'gcc main.c -o main', run_cmd: './main', category: 'Popular', extension: 'c' },
  { id: 54, name: 'C++ (GCC 9.2.0)', is_archived: false, source_file: 'main.cpp', compile_cmd: 'g++ main.cpp -o main', run_cmd: './main', category: 'Popular', extension: 'cpp' },
  { id: 51, name: 'C# (Mono 6.6.0.161)', is_archived: false, source_file: 'Main.cs', compile_cmd: 'mcs Main.cs', run_cmd: 'mono Main.exe', category: 'Popular', extension: 'cs' },
  { id: 68, name: 'PHP (7.4.1)', is_archived: false, source_file: 'main.php', compile_cmd: null, run_cmd: 'php main.php', category: 'Popular', extension: 'php' },
  { id: 72, name: 'Ruby (2.7.0)', is_archived: false, source_file: 'main.rb', compile_cmd: null, run_cmd: 'ruby main.rb', category: 'Popular', extension: 'rb' },
  { id: 60, name: 'Go (1.13.5)', is_archived: false, source_file: 'main.go', compile_cmd: null, run_cmd: 'go run main.go', category: 'Popular', extension: 'go' },
  { id: 73, name: 'Rust (1.40.0)', is_archived: false, source_file: 'main.rs', compile_cmd: 'rustc main.rs', run_cmd: './main', category: 'Popular', extension: 'rs' },
  { id: 83, name: 'Swift (5.2.3)', is_archived: false, source_file: 'main.swift', compile_cmd: 'swiftc main.swift', run_cmd: './main', category: 'Popular', extension: 'swift' },
  { id: 78, name: 'Kotlin (1.3.70)', is_archived: false, source_file: 'Main.kt', compile_cmd: 'kotlinc Main.kt -include-runtime -d Main.jar', run_cmd: 'java -jar Main.jar', category: 'Popular', extension: 'kt' },

  // Scripting
  { id: 46, name: 'Bash (5.0.0)', is_archived: false, source_file: 'script.sh', compile_cmd: null, run_cmd: 'bash script.sh', category: 'Scripting', extension: 'sh' },
  { id: 85, name: 'Perl (5.28.1)', is_archived: false, source_file: 'main.pl', compile_cmd: null, run_cmd: 'perl main.pl', category: 'Scripting', extension: 'pl' },
  { id: 80, name: 'R (4.0.0)', is_archived: false, source_file: 'main.r', compile_cmd: null, run_cmd: 'Rscript main.r', category: 'Scripting', extension: 'r' },
  { id: 64, name: 'Lua (5.3.5)', is_archived: false, source_file: 'main.lua', compile_cmd: null, run_cmd: 'lua main.lua', category: 'Scripting', extension: 'lua' },

  // Systems
  { id: 45, name: 'Assembly (NASM 2.14.02)', is_archived: false, source_file: 'main.asm', compile_cmd: 'nasm -f elf64 main.asm && ld main.o -o main', run_cmd: './main', category: 'Systems', extension: 'asm' },
  { id: 59, name: 'Fortran (GFortran 9.2.0)', is_archived: false, source_file: 'main.f90', compile_cmd: 'gfortran main.f90 -o main', run_cmd: './main', category: 'Systems', extension: 'f90' },
  { id: 77, name: 'COBOL (GnuCOBOL 2.2)', is_archived: false, source_file: 'main.cob', compile_cmd: 'cobc -x -o main main.cob', run_cmd: './main', category: 'Systems', extension: 'cob' },

  // Other
  { id: 61, name: 'Haskell (GHC 8.8.1)', is_archived: false, source_file: 'main.hs', compile_cmd: 'ghc -o main main.hs', run_cmd: './main', category: 'Other', extension: 'hs' },
  { id: 81, name: 'Scala (2.13.2)', is_archived: false, source_file: 'Main.scala', compile_cmd: 'scalac Main.scala', run_cmd: 'scala Main', category: 'Other', extension: 'scala' },
  { id: 86, name: 'Clojure (1.10.1)', is_archived: false, source_file: 'main.clj', compile_cmd: null, run_cmd: 'clojure main.clj', category: 'Other', extension: 'clj' },
  { id: 57, name: 'Elixir (1.9.4)', is_archived: false, source_file: 'main.exs', compile_cmd: null, run_cmd: 'elixir main.exs', category: 'Other', extension: 'exs' },
  { id: 58, name: 'Erlang (OTP 22.2)', is_archived: false, source_file: 'main.erl', compile_cmd: 'erlc main.erl', run_cmd: 'erl -noshell -s main -s init stop', category: 'Other', extension: 'erl' },
  { id: 87, name: 'F# (.NET Core SDK 3.1.202)', is_archived: false, source_file: 'main.fs', compile_cmd: 'dotnet build', run_cmd: 'dotnet run', category: 'Other', extension: 'fs' },
  { id: 65, name: 'OCaml (4.09.0)', is_archived: false, source_file: 'main.ml', compile_cmd: 'ocamlc -o main main.ml', run_cmd: './main', category: 'Other', extension: 'ml' },
  { id: 67, name: 'Pascal (FPC 3.0.4)', is_archived: false, source_file: 'main.pas', compile_cmd: 'fpc main.pas', run_cmd: './main', category: 'Other', extension: 'pas' },
  { id: 69, name: 'Prolog (GNU Prolog 1.4.5)', is_archived: false, source_file: 'main.pl', compile_cmd: 'gplc main.pl', run_cmd: './main', category: 'Other', extension: 'pl' },
  { id: 82, name: 'SQL (SQLite 3.27.2)', is_archived: false, source_file: 'script.sql', compile_cmd: null, run_cmd: 'sqlite3 :memory: < script.sql', category: 'Other', extension: 'sql' },
];

export const getLanguageById = (id: number) => languages.find(lang => lang.id === id);
