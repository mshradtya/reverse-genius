import ast
import json

def extract_functions_from_file(python_script_path):
    try:
        # Read the Python script content from the specified file
        with open(python_script_path, "r") as file:
            code = file.read()

        functions = extract_functions(code,python_script_path)

        return functions

    except Exception as e:
        return {"error": str(e)}

def extract_functions(code,python_script_path):
    functions = []

    tree = ast.parse(code)
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            function_name = node.name
            filename = python_script_path
            function_content = ast.unparse(node)
            functions.append({"name": function_name, "content": function_content,"fileName":filename})

    return functions

if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("Usage: extract_functions.py <python_script.py>")
        sys.exit(1)

    python_script_path = sys.argv[1]
    extracted_functions = extract_functions_from_file(python_script_path)

    # Print the extracted functions as JSON
    print(json.dumps(extracted_functions))