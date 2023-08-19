import pandas as pd
import os
from tqdm import tqdm
import gensim
from string import punctuation
from nltk.tokenize import wordpunct_tokenize
import logging
import datetime
import nltk

nltk.download("stopwords")
from nltk.corpus import stopwords

# Set up the logging configuration
logging.basicConfig(
    filename="AI_stuff/data/log_file.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

# Create a logger
logger = logging.getLogger(__name__)

try:
    # Log the start of the script
    logger.info("Script started.")

    # Record the start time
    start_time = datetime.datetime.now()

    # Load job and student data
    logger.info("Loading job and student data...")

    # Define the paths for the input data files
    data_folder = "AI_stuff/data"
    jobs_csv_path = os.path.join(data_folder, "job posts dataset", "job_data.json")

    # Read the job data from the CSV file
    df_jobs = pd.read_json(jobs_csv_path)

    students_csv_path = os.path.join(
        data_folder, "job posts dataset", "student_data.json"
    )

    df_students = pd.read_json(students_csv_path)
    # drop unnecessary columns
    df_jobs.drop(
        columns=[
            "Company_id",
            "Type",
            "Company_id",
            "Type",
            "Expiration",
            "Department_id",
        ],
        inplace=True,
    )
    df_students.drop(
        columns=[
            "Username",
            "Password",
            "Email",
            "Phone",
            "Picture_url",
        ],
        inplace=True,
    )

    # Drop rows with missing values
    df_jobs.replace("", pd.NA, inplace=True)
    df_students.replace("", pd.NA, inplace=True)

    df_jobs = df_jobs.dropna()
    df_students = df_students.dropna()

    # Reset index and add unique IDs to job and student data
    df_jobs.reset_index(inplace=True)
    df_students.reset_index(inplace=True)
    df_jobs.drop(["index"], axis=1, inplace=True)
    df_students.drop(["index"], axis=1, inplace=True)

    # df_jobs["Job_id"] = [i for i in range(len(df_jobs))]
    # Move the 'ID' column to the first position in the DataFrame
    cols = df_jobs.columns.tolist()
    cols = (
        ["Job_id"]
        + ["Gender"]
        + ["Skills"]
        + ["Description"]
        + [
            col
            for col in cols
            if col not in ["Job_id", "Gender", "Skills", "Description"]
        ]
    )
    df_jobs = df_jobs[cols]

    # df_students["Student_id"] = [i for i in range(len(df_students))]
    # Move the 'ID' column to the first position in the DataFrame
    cols = df_students.columns.tolist()
    cols = ["Student_id"] + [col for col in cols if col != "Student_id"]
    df_students = df_students[cols]
    # Update 'Gender' column using a lambda function
    df_jobs["Gender"] = df_jobs.apply(
        lambda x: "Male Female" if x["Gender"] == "Any" else x["Gender"], axis=1
    )

    # Preprocess text data in job and student data
    list_stopwords = set(stopwords.words("english") + list(punctuation))

    df_students["skills_list"] = (
        df_students["Skills"].str.lower().apply(wordpunct_tokenize)
    )
    df_students["description"] = (
        df_students["Description"].str.lower().apply(wordpunct_tokenize)
    )
    df_students["Gender"] = df_students["Gender"].str.lower().apply(wordpunct_tokenize)

    df_jobs["skills_list"] = df_jobs["Skills"].str.lower().apply(wordpunct_tokenize)
    df_jobs["description"] = (
        df_jobs["Description"].str.lower().apply(wordpunct_tokenize)
    )
    df_jobs["Gender"] = df_jobs["Gender"].str.lower().apply(wordpunct_tokenize)

    df_students["skills_list"] = df_students["skills_list"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )
    df_students["description"] = df_students["description"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )
    df_students["Gender"] = df_students["Gender"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )

    df_students["skills_list"] = df_students["skills_list"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )
    df_students["description"] = df_students["description"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )
    df_students["Gender"] = df_students["Gender"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )

    df_jobs["skills_list"] = df_jobs["skills_list"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )
    df_jobs["description"] = df_jobs["description"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )
    df_jobs["Gender"] = df_jobs["Gender"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )
    df_jobs["skills_list"] = df_jobs["skills_list"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )
    df_jobs["description"] = df_jobs["description"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )
    df_jobs["Gender"] = df_jobs["Gender"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )

    df_students["skills_list"] = df_students["skills_list"].apply(
        lambda x: list(set(x))
    )
    df_students["description"] = df_students["description"].apply(
        lambda x: list(set(x))
    )
    df_students["Gender"] = df_students["Gender"].apply(lambda x: list(set(x)))

    df_jobs["skills_list"] = df_jobs["skills_list"].apply(lambda x: list(set(x)))
    df_jobs["description"] = df_jobs["description"].apply(lambda x: list(set(x)))
    df_jobs["Gender"] = df_jobs["Gender"].apply(lambda x: list(set(x)))

    # Load Word2Vec model
    logger.info("Loading Word2Vec model...")
    wv = gensim.models.KeyedVectors.load_word2vec_format(
        "AI_stuff\data\googlenewsvectorsnegative300\GoogleNews-vectors-negative300.bin",
        binary=True,
    )
    # vectoring
    # Create an empty list to hold the modified data
    matrix_jobs_vocab = []
    for list_ in df_jobs.to_numpy():
        list_[1] = [word for word in list_[1] if word in wv.key_to_index] * 1
        list_[5] = [word for word in list_[5] if word in wv.key_to_index] * 1
        list_[6] = [word for word in list_[6] if word in wv.key_to_index] * 1

        # Concatenate columns 1, 5, and 6 into a single string
        soup = list_[1] + list_[5] + list_[6]

        # Append 'ID' and the soup to the modified list
        modified_list = [list_[0], soup]
        matrix_jobs_vocab.append(modified_list)

    # Create an empty list to hold the modified data
    matrix_students_vocab = []

    for list_ in df_students.to_numpy():
        list_[1] = [word for word in list_[1] if word in wv.key_to_index] * 1
        list_[4] = [word for word in list_[4] if word in wv.key_to_index] * 1
        list_[5] = [word for word in list_[5] if word in wv.key_to_index] * 1

        # Concatenate columns 1, 6, and 7 into a single string
        soup = list_[1] + list_[4] + list_[5]

        # Append 'ID' and the soup to the modified list
        modified_list = [list_[0], soup]
        matrix_students_vocab.append(modified_list)

    # generate matrix
    def generate_similarity_matrix():
        matrix_similarity = {}

        pbar = tqdm(matrix_students_vocab)
        for row1 in pbar:
            soup1 = row1[1]
            if not soup1:
                # Skip rows without a valid title or description
                print(f"{row1[0]}\t{soup1}")
                continue

            similarities = []
            for row2 in matrix_jobs_vocab:
                soup2 = row2[1]
                if not soup2:
                    # Skip rows without a valid title or description
                    print(f"{row2[0]}\t{soup2}")
                    continue

                final_score = wv.n_similarity(soup1, soup2)

                similarities.append((row2[0], final_score))

            similarities.sort(key=lambda x: x[1], reverse=True)
            # Sort by final score in descending order
            top_similarities = similarities[:20]  # Get top 20 most similar titles
            # Get the top 20 most similar IDs
            top_similar_ids = [similarity[0] for similarity in similarities[:20]]

            matrix_similarity[row1[0]] = top_similar_ids

        df = pd.DataFrame.from_dict(matrix_similarity, orient="index")
        json_string = df.to_json(orient="index")

        # Define the file path where you want to save the JSON file
        file_path = "AI_stuff/data/output.json"
        # Open the file in write mode and save the JSON string
        with open(file_path, "w") as json_file:
            json_file.write(json_string)

        pbar.close()
        return "generation complete"

    # Call the similarity matrix generation function
    generate_similarity_matrix()

except FileNotFoundError as e:
    logger.error("File not found: %s", str(e))

except pd.errors.EmptyDataError as e:
    logger.error("Empty data error: %s", str(e))

except gensim.utils.FileCorrupError as e:
    logger.error("Word2Vec model file is corrupted: %s", str(e))

except Exception as e:
    # Log any other unhandled exceptions with stack traces
    logger.exception("An error occurred: %s", str(e))

finally:
    # Record the end time
    end_time = datetime.datetime.now()

    # Calculate the total time taken
    total_time = end_time - start_time

    # Log the total time
    logger.info(f"Total time taken: {total_time}")

    # Log the end of the script
    logger.info("Script finished.")
