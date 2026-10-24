export const codeTemplates: Record<number, string> = {
  // JavaScript
  63: `console.log("Hello, World!");\n`,
  // TypeScript
  74: `console.log("Hello, World!");\n`,
  // Python
  71: `print("Hello, World!")\n`,
  // Java
  62: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}\n`,
  // C
  50: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}\n`,
  // C++
  54: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}\n`,
  // C#
  51: `using System;

class MainClass {
    public static void Main (string[] args) {
        Console.WriteLine ("Hello, World!");
    }
}\n`,
  // PHP
  68: `<?php
echo "Hello, World!";\n`,
  // Ruby
  72: `puts "Hello, World!"\n`,
  // Go
  60: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}\n`,
  // Rust
  73: `fn main() {
    println!("Hello, World!");
}\n`,
  // Swift
  83: `print("Hello, World!")\n`,
  // Kotlin
  78: `fun main() {
    println("Hello, World!")
}\n`,
  // Bash
  46: `echo "Hello, World!"\n`,
  // Perl
  85: `print "Hello, World!\\n";\n`,
  // R
  80: `print("Hello, World!")\n`,
  // Lua
  64: `print("Hello, World!")\n`,
  // Assembly
  45: `section .data
    hello db 'Hello, World!',0xA
    len equ $-hello

section .text
    global _start

_start:
    mov edx, len
    mov ecx, hello
    mov ebx, 1
    mov eax, 4
    int 0x80

    mov ebx, 0
    mov eax, 1
    int 0x80\n`,
  // Fortran
  59: `program hello
  print *, "Hello, World!"
end program hello\n`,
  // COBOL
  77: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.
       PROCEDURE DIVISION.
           DISPLAY 'Hello, World!'.
           STOP RUN.\n`,
  // Haskell
  61: `main = putStrLn "Hello, World!"\n`,
  // Scala
  81: `object Main {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
  }
}\n`,
  // Clojure
  86: `(println "Hello, World!")\n`,
  // Elixir
  57: `IO.puts "Hello, World!"\n`,
  // Erlang
  58: `-module(main).
-export([start/0]).

start() ->
    io:format("Hello, World!~n").\n`,
  // F#
  87: `printfn "Hello, World!"\n`,
  // OCaml
  65: `print_endline "Hello, World!";;\n`,
  // Pascal
  67: `program Hello;
begin
  writeln ('Hello, World!');
end.\n`,
  // Prolog
  69: `:- initialization(main).
main :- write('Hello, World!'), nl, halt.\n`,
  // SQL
  82: `CREATE TABLE helloworld (message TEXT);
INSERT INTO helloworld VALUES ('Hello, World!');
SELECT * FROM helloworld;\n`,
};

export const getTemplate = (id: number) => codeTemplates[id] || '';
