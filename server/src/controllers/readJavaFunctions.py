import ast
import json
import re


def extract_classes_and_methods_from_java_file(java_file_path):
    try:
        with open(java_file_path, 'r') as file:
            code = file.read()

        classes_and_methods = extract_classes_and_methods(java_file_path)

        return classes_and_methods

    except Exception as e:
        return {"error": str(e)}

def extract_classes_and_methods(java_file_path):
    try:
        with open(java_file_path, 'r') as file:
            code = file.read()

        class_pattern = r'class\s+(\w+)(?:\s+extends\s+(\w+))?[^{]*\{([^}]+)\}'
        classes = re.findall(class_pattern, code)

        method_pattern = r'\s+(\w+)\s*\([^)]*\)\s*\{([^}]+)\}'
        methods = re.findall(method_pattern, code)

        classes_and_methods = []

        for class_name, parent_class, class_content in classes:
            class_info = {
                "type": "class",
                "name": class_name,
                "content": class_content.strip(),
                "fileName": java_file_path
            }

            if parent_class:
                class_info["parent"] = parent_class

            classes_and_methods.append(class_info)

        for method_name, method_content in methods:
            method_info = {"type": "method", "name": method_name, "content": method_content.strip(), "fileName": java_file_path}
            
            # Check if the method is defined within a class
            for class_info in classes_and_methods:
                if method_info["content"] in class_info["content"]:
                    method_info["parent"] = class_info["name"]

            classes_and_methods.append(method_info)

        return classes_and_methods

    except Exception as e:
        return {"error": str(e)}
    
    

if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("Usage: extract_functions.py <python_script.py>")
        sys.exit(1)

    python_script_path = sys.argv[1]
    extracted_functions = extract_classes_and_methods_from_java_file(python_script_path)
    

    # Print the extracted functions as JSON
    print(json.dumps(extracted_functions, indent=2))