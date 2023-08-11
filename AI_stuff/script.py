import numpy as np
import pandas as pd
import uuid
import os
from tqdm import tqdm
import gensim
from string import punctuation
from nltk.tokenize import wordpunct_tokenize
import logging
import datetime
import nltk 
nltk.download('stopwords')
from nltk.corpus import stopwords

# ec948698

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
    data_folder = 'AI_stuff/data'
    jobs_csv_path = os.path.join(data_folder, 'job posts dataset', 'data job posts.csv')

    # Read the job data from the CSV file
    df_jobs = pd.read_csv(jobs_csv_path)
    df_jobs = df_jobs[:300]

    students_csv_path = os.path.join(data_folder, 'job posts dataset', 'data job posts.csv')

    df_students = pd.read_csv(students_csv_path)
    df_students = df_students[300:600]

    # Drop unnecessary columns from job and student data
    df_jobs.drop(
        columns=[
            "jobpost",
            "date",
            "Company",
            "AnnouncementCode",
            "Term",
            "Eligibility",
            "Audience",
            "StartDate",
            "Duration",
            "Location",
            "JobRequirment",
            "RequiredQual",
            "Salary",
            "ApplicationP",
            "OpeningDate",
            "Deadline",
            "Notes",
            "AboutC",
            "Attach",
            "Year",
            "Month",
            "IT",
        ],
        inplace=True,
    )
    df_students.drop(
        columns=[
            "jobpost",
            "date",
            "Company",
            "AnnouncementCode",
            "Term",
            "Eligibility",
            "Audience",
            "StartDate",
            "Duration",
            "Location",
            "JobRequirment",
            "RequiredQual",
            "Salary",
            "ApplicationP",
            "OpeningDate",
            "Deadline",
            "Notes",
            "AboutC",
            "Attach",
            "Year",
            "Month",
            "IT",
        ],
        inplace=True,
    )

    # Rename columns in student data
    df_students.rename(columns={"JobDescription": "Description"}, inplace=True)

    # Generate random gender for job and student data
    gender = np.random.choice(["male", "female"], size=len(df_jobs), p=[0.4, 0.6])
    df_jobs["gender"] = gender

    gender = np.random.choice(["male", "female"], size=len(df_students), p=[0.5, 0.5])
    df_students["gender"] = gender

    # Drop rows with missing values
    df_jobs = df_jobs.dropna()
    df_students = df_students.dropna()

    # Reset index and add unique IDs to job and student data
    df_jobs.reset_index(inplace=True)
    df_students.reset_index(inplace=True)

    df_jobs["ID"] = [str(uuid.uuid4()) for _ in range(len(df_jobs))]
    cols = df_jobs.columns.tolist()
    cols = ["ID"] + [col for col in cols if col != "ID"]
    df_jobs = df_jobs[cols]

    df_students["ID"] = [str(uuid.uuid4()) for _ in range(len(df_students))]
    cols = df_students.columns.tolist()
    cols = ["ID"] + [col for col in cols if col != "ID"]
    df_students = df_students[cols]

    # Preprocess text data in job and student data
    list_stopwords = set(stopwords.words("english") + list(punctuation))

    df_students["title_list"] = df_students["Title"].str.lower().apply(wordpunct_tokenize)
    df_students["description"] = (
        df_students["Description"].str.lower().apply(wordpunct_tokenize)
    )
    df_jobs["title_list"] = df_jobs["Title"].str.lower().apply(wordpunct_tokenize)
    df_jobs["description"] = df_jobs["JobDescription"].str.lower().apply(wordpunct_tokenize)

    df_students["title_list"] = df_students["title_list"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )
    df_students["description"] = df_students["description"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )
    df_students["title_list"] = df_students["title_list"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )
    df_students["description"] = df_students["description"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )
    df_jobs["title_list"] = df_jobs["title_list"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )
    df_jobs["description"] = df_jobs["description"].apply(
        lambda x: [word for word in x if word not in list_stopwords]
    )
    df_jobs["title_list"] = df_jobs["title_list"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )
    df_jobs["description"] = df_jobs["description"].apply(
        lambda x: [word for word in x if len(word) > 0]
    )

    df_students["title_list"] = df_students["title_list"].apply(lambda x: list(set(x)))
    df_students["description"] = df_students["description"].apply(lambda x: list(set(x)))
    df_jobs["title_list"] = df_jobs["title_list"].apply(lambda x: list(set(x)))
    df_jobs["description"] = df_jobs["description"].apply(lambda x: list(set(x)))

    # Load Word2Vec model
    logger.info("Loading Word2Vec model...")
    wv = gensim.models.KeyedVectors.load_word2vec_format(
        "AI_stuff\data\googlenewsvectorsnegative300\GoogleNews-vectors-negative300.bin", binary=True
    )

    # Create matrix of vocabulary for jobs
    matrix_jobs_vocab = []
    for list_ in df_jobs.to_numpy():
        list_[4] = [word for word in list_[4] if word in wv.key_to_index]
        list_[5] = [word for word in list_[5] if word in wv.key_to_index]
        matrix_jobs_vocab.append(list_)

    # Create matrix of vocabulary for students
    matrix_students_vocab = []
    for list_ in df_students.to_numpy():
        list_[4] = [word for word in list_[4] if word in wv.key_to_index]
        list_[5] = [word for word in list_[5] if word in wv.key_to_index]
        matrix_students_vocab.append(list_)


    # Generate similarity matrix
    def generate_similarity_matrix():
        logger.info("Generating similarity matrix...")

        matrix_similarity = {}

        pbar = tqdm(matrix_students_vocab)
        for row1 in pbar:
            title_list1 = row1[4]
            description1 = row1[5]
            if not title_list1 or not description1:
                # Skip rows without a valid title or description
                logger.warning(f"Row ID {row1[0]} has missing title_list or description.")
                continue

            similarities = []
            for row2 in matrix_jobs_vocab:
                title_list2 = row2[4]
                description2 = row2[5]
                if not title_list2 or not description2:
                    # Skip rows without a valid title or description
                    logger.warning(
                        f"Row ID {row2[0]} has missing title_list or description."
                    )
                    continue

                score_title = wv.n_similarity(title_list1, title_list2)
                score_desc = wv.n_similarity(description1, description2)
                final_score = score_title + score_desc

                similarities.append((row2[0], final_score))

            similarities.sort(key=lambda x: x[1], reverse=True)
            top_similar_ids = [similarity[0] for similarity in similarities[:10]]

            matrix_similarity[row1[0]] = top_similar_ids

        df = pd.DataFrame.from_dict(matrix_similarity, orient="index")
        json_string = df.to_json(orient="index")

        # Define the file path where you want to save the JSON file
        file_path = "AI_stuff/data/output.json"
        # Open the file in write mode and save the JSON string
        with open(file_path, "w") as json_file:
            json_file.write(json_string)

        pbar.close()
        logger.info("Similarity matrix generation completed.")

        return "generation completed"


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
    logger.info("Script finished.")