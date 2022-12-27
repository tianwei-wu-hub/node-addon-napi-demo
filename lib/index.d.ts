
export declare namespace PDFConversionSDK {
  enum ErrorCode {
    /** @brief Success, and no error occurs. */
    e_ErrSuccess = 0,
    /** @brief File cannot be found or could not be opened. */
    e_ErrFile = 1,
    /** @brief Format is invalid. For files, this may also mean that file is corrupted. */
    e_ErrFormat = 2,
    /**
     * @brief Invalid password. Usually, this error may occur when loading a PDF document with password.
     *       When meet this, user should load document again with correct password.
     */
    e_ErrPassword = 3,
    /** @brief Error handle. */
    e_ErrHandle = 4,
    /**
     * @brief Certificate error: PDF document is encrypted by digital certificate 
     *       but current user does not have the correct certificate.
     */
    e_ErrCertificate = 5,
    /** @brief Any unknown error occurs. */
    e_ErrUnknown = 6,
    /** @brief Invalid license is used to initialize Foxit PDF Conversion SDK library. */
    e_ErrInvalidLicense = 7,
    /** @brief Parameter error: value of any input parameter for a function is invalid.*/
    e_ErrParam = 8,
    /** @brief Some types are not supported.*/
    e_ErrUnsupported = 9,
    /** @brief Out-of-memory error occurs.*/
    e_ErrOutOfMemory = 10,
    /** @brief PDF document is encrypted by some unsupported security handler. */
    e_ErrSecurityHandler = 11,
    /** @brief Content has not been parsed yet. Usually, this represents PDF page has not been parsed yet. */
    e_ErrNotParsed = 12,
    /** @brief Expected data or object is not found. */
    e_ErrNotFound = 13,
    /** @brief The type of input object or current object is invalid. */
    e_ErrInvalidType = 14,
    /** @brief Any unknown state occurs. */
    e_ErrUnknownState = 16,
    /**
     * @brief Data is not ready. Usually this is used as an exception error code
     *       when loading document in asynchronous way.
     */
    e_ErrDataNotReady = 17,
    /** @brief Current object has not been loaded yet.*/
    e_ErrNotLoaded = 20,
    e_ErrNoPDF2OfficeModuleRight = 77
  }

  enum State {
    /** @brief Progress state: any error occurs. */
    e_Error = 0,
    /** @brief Progress state: progress needs to be continued. */
    e_ToBeContinued = 1,
    /** @brief Progress state: progress is finished. */
    e_Finished = 2
  }

  /**
   * This class represents the library management.
   * It contains functions to initialize/re-initialize/release Foxit PDF Conversion SDK library, and also contains functions
   * for global use.<br>
   * Any application should load Foxit PDF Conversion SDK by function @link Library.Initialize @endlink before calling any other
   * Foxit PDF Conversion SDK functions. When there is no need to use Foxit PDF Conversion SDK any more, please call
   * function @link Library.Release @endlink.<br>
   * Functions in Foxit PDF Conversion SDK may throw exception when some error occurs. User can catch these exceptions and
   * check the error code with values starting from @link ErrorCode.e_ErrFile @endlink to know more about what error occurs.
   * 
   * @note During the life-cycle of an application, @link Library.Initialize @endlink and @link Library.Release @endlink should
   *       be called in pair and can only be called once. Once @link Library.Release @endlink is called during
   *       the life-cycle of an application, Foxit PDF Conversion SDK cannot be initialized any more in the life-cycle of the application.
   *       Before @link Library.Release @endlink is called, if user wants to re-initialize Foxit PDF Conversion SDK, please refer to
   *       function @link Library.Reinitialize @endlink.
   */
  class Library {
    /**
     * @brief Initialize Foxit PDF Conversion SDK Library, with valid license information.
     *
     * @details During the life-cycle of an application, this function can only be called once and
     *          should be called first before any other functions in Foxit PDF Conversion SDK can be called.<br>
     *          Once function @link Library.Release @endlink is called, Foxit PDF Conversion SDK library cannot
     *          be initialized any more in the life-cycle of the application.
     *
     * @param[in] sn   String of sn information, which can be retrieved from "SN=" part in key file "gsdk_sn.txt" or "rdk_sn.txt".
     * @param[in] key  String of key information, which can be retrieved from "Sign=" part in key file "gsdk_key.txt" or "rdk_key.txt".
     *
     * @return @link ErrorCode.e_ErrSuccess @endlink means success.<br>
     *         @link ErrorCode.e_ErrInvalidLicense @endlink means input license information is invalid.<br>
     *         @link ErrorCode.e_ErrParam @endlink means parameter <i>sn</i> or <i>key</i> is an empty string.<br>
     *         For more information about error code values, please refer to values starting from @link ErrorCode.e_ErrSuccess @endlink.
     */
    static Initialize(sn: string, key: string): PDFConversionSDK.ErrorCode;

    /**
     * @brief Re-initialize Foxit PDF Conversion SDK Library.
     *
     * @details When user meets out-of-memory error or user wants to re-initialize Foxit PDF Conversion SDK library before
     *          function @link Library.Release @endlink is called, user can call this function to re-initialize Foxit PDF Conversion SDK Library.<br>
     *          Once function @link Library.Release @endlink is called, Foxit PDF Conversion SDK library cannot
     *          be initialized any more in the life-cycle of the application.
     *
     * @return @link ErrorCode.e_ErrSuccess @endlink means success.
     *         For more information about error code values, please refer to values starting from @link ErrorCode.e_ErrSuccess @endlink.
     */
    static Reinitialize(): PDFConversionSDK.ErrorCode;

    /**
     * @brief Release all resource allocated by Foxit PDF Conversion SDK Library.
     *
     * @details User should call this function to release all memory blocks allocated by the library.<br>
     *          Once this fucntion is called, Foxit PDF Conversion SDK library cannot be initialized any more
     *          in the life-cycle of the application.
     *
     * @return None.
     */
    static Release(): void;

    /**
     * @brief Get the version of current Foxit PDF Conversion SDK library.
     *
     * @return Version string.
     */
    static GetVersion(): string;
  }

  /** This class represents setting data used for converting PDF to Office(Word, Excel or PowerPoint) format file. */
  class PDF2OfficeSettingData {
    /**
     * @brief Constructor, with parameters.
     *
     * @param[in] metrics_data_folder_path    A valid path of a folder which contains metrics data files. This should not be an empty string. 
     *                                        These metrics data files are used to simulate the office format document typesetting process during conversion.
     *                                        They are offered in the "res/metrics_data" folder of the Foxit PDF Conversion SDK package.
     * @param[in] enable_ml_recognition       A boolean value which indicates whether enable machine learning-based recognition functionality.
     *                                        <b>true</b> means enable machine learning-based recognition functionality to enhance recognition results in PDF documents. 
     *                                        And this recognition functionality will be executed on the server side and return the relevant results when it is done. 
     *                                        <b>false</b> means disable machine learning-based recognition functionality.
     *                                        And the recognition functionality not based on machine learning will be enabled.
     */
    constructor(metrics_data_folder_path: string, enable_ml_recognition: boolean);

    /**
     * @brief Set value.
     *
     * @param[in] metrics_data_folder_path    A valid path of a folder which contains metrics data files. This should not be an empty string. 
     *                                        These metrics data files are used to simulate the office format document typesetting process during conversion.
     *                                        They are offered in the "res/metrics_data" folder of the Foxit PDF Conversion SDK package.
     * @param[in] enable_ml_recognition       A boolean value which indicates whether enable machine learning-based recognition functionality.
     *                                        <b>true</b> means enable machine learning-based recognition functionality to enhance recognition results in PDF documents. 
     *                                        And this recognition functionality will be executed on the server side and return the relevant results when it is done. 
     *                                        <b>false</b> means disable machine learning-based recognition functionality.
     *                                        And the recognition functionality not based on machine learning will be enabled.
     *
     * @return None.
     */
    Set(metrics_data_folder_path: string, enable_ml_recognition: boolean): void;
  }

  /**
   * This class represents a callback object used to pause and notify the conversion progress during the converting process.
   * All the pure virtual functions in this class are used as callback functions and should be implemented by user.
   */
  abstract class ConvertCallback {
    /**
     * @brief A callback function used to pause the current conversion progress.
     *
     * @return <b>true</b> means to pause now, while <b>false</b> means not to pause now.
     */
    abstract NeedToPause(): boolean;

    /**
     * @brief A callback function used to notify the current conversion progress.
     *
     * @param[in] converted_count   The converted page count.
     * @param[in] total_count       The total page count.
     *
     * @return None.
     */
    abstract ProgressNotify(converted_count: number, total_count: number): void;
  }

  /**
   * This class represents a progressive object, which is used for progressive process as converting PDF document to Office document.
   */
  class Progressive {
    /**
     * @brief Continue the progressive process.
     *
     * @return @link State.e_Finished @endlink means current process is finished successfully.<br>
     *         @link State.e_ToBeContinued @endlink means current process is suspended,
     *         and this function needs to be called again to continue the process.<br>
     *         @link State.e_Error @endlink means any error occurs.
     */
    Continue(): PDFConversionSDK.State;

    /**
     * @brief Get the rate of current progress.
     *
     * @return An integer between 0 and 100 (inclusive), indicating the rate of current progress.
     *         -1 means error.
     */
    GetRateOfProgress(): number;
  }

  /**
   * This class can be used to convert PDF files to Office(Word, Excel or PowerPoint) format files.
   * Before using "Conversion" module, please ensure the resource floder named "res" in the PDF Conversion SDK package is valid.
   * Before using methods in this module, please ensure Foxit PDF Conversion SDK has been initialized successfully
   * by function @link Library.Initialize @endlink with a key including "PDF2Office" module.
   *
   * @see @link Library @endlink
   */
  class PDF2Office {
    /**
     * @brief Start to convert a PDF file to a Word format file. 
     *
     * @details Currently only support converting to DOCX format file.
     *
     * @param[in] src_pdf_path             Path of a PDF file. This should not be an empty string.
     * @param[in] src_pdf_password         Password for the input PDF file. If no password is needed for the file, please pass an empty string.
     * @param[in] saved_word_file_path     Path of the saved Word format file as conversion result. This should not be an empty string.
     *                                     If the suffix name of the saved Word format file is not "docx", a new suffix named "docx" will be added to the original file name.
     * @param[in] setting_data             Setting data used for converting.
     * @param[in] convert_callback         A @link conversion.pdf2office.ConvertCallback @endlink object which is implemented by user
     *                                     to pause and notify the conversion progress during the converting process.
     *                                     This can be <b>NULL</b> which means not to pause and notify the conversion progress.
     *                                     If this is not <b>NULL</b>, it should be a valid @link conversion.pdf2office.ConvertCallback @endlink 
     *                                     object implemented by user.
     *                                     Default value: <b>NULL</b>.
     *
     * @return A progressive object. Please check the rate of current progress by function
     *         @link Progressive.GetRateOfProgress @endlink. If the rate is not 100 yet, call function
     *         @link Progressive.Continue @endlink to continue the progress until the progress is finished.
     *
     * @note If module "PDF2Office" is not defined in the license information which is used in function
     *       @link Library.Initialize @endlink, that means user has no right in using this function and
     *       this function will throw exception @link ErrorCode.e_ErrNoPDF2OfficeModuleRight @endlink.
     */
    StartConvertToWordWithPath(src_pdf_path: string, src_pdf_password: string, saved_word_file_path: string, setting_data: PDFConversionSDK.PDF2OfficeSettingData, convert_callback: PDFConversionSDK.ConvertCallback): PDFConversionSDK.Progressive;

    /**
     * @brief Start to convert a PDF file to a Excel format file.
     *
     * @details Currently only support converting to XLSX format file.
     *
     * @param[in] src_pdf_path             Path of a PDF file. This should not be an empty string.
     * @param[in] src_pdf_password         Password for the input PDF file. If no password is needed for the file, please pass an empty string.
     * @param[in] saved_excel_file_path    Path of the saved Excel format file as conversion result. This should not be an empty string.
     *                                     If the suffix name of the saved Excel format file is not "xlsx", a new suffix named "xlsx" will be added to the original file name.
     * @param[in] setting_data             Setting data used for converting.
     * @param[in] convert_callback         A @link conversion.pdf2office.ConvertCallback @endlink object which is implemented by user
     *                                     to pause and notify the conversion progress during the converting process.
     *                                     This can be <b>NULL</b> which means not to pause and notify the conversion progress.
     *                                     If this is not <b>NULL</b>, it should be a valid @link conversion.pdf2office.ConvertCallback @endlink 
     *                                     object implemented by user.
     *                                     Default value: <b>NULL</b>.
     *
     * @return A progressive object. Please check the rate of current progress by function
     *         @link Progressive.GetRateOfProgress @endlink. If the rate is not 100 yet, call function
     *         @link Progressive.Continue @endlink to continue the progress until the progress is finished.
     *
     * @note If module "PDF2Office" is not defined in the license information which is used in function
     *       @link Library.Initialize @endlink, that means user has no right in using this function and
     *       this function will throw exception @link ErrorCode.e_ErrNoPDF2OfficeModuleRight @endlink.
     */
    StartConvertToExcelWithPath(src_pdf_path: string, src_pdf_password: string, saved_excel_file_path: string, setting_data: PDFConversionSDK.PDF2OfficeSettingData, convert_callback: PDFConversionSDK.ConvertCallback): PDFConversionSDK.Progressive;

    /**
     * @brief Start to convert a PDF file to a PowerPoint format file.
     *
     * @details Currently only support converting to PPTX format file.
     *
     * @param[in] src_pdf_path             Path of a PDF file. This should not be an empty string.
     * @param[in] src_pdf_password         Password for the input PDF file. If no password is needed for the file, please pass an empty string.
     * @param[in] saved_ppt_file_path      Path of the saved PowerPoint format file as conversion result. This should not be an empty string.
     *                                     If the suffix name of the saved PowerPoint format file is not "pptx", a new suffix named "pptx" will be added to the original file name.
     * @param[in] setting_data             Setting data used for converting.
     * @param[in] convert_callback         A @link conversion.pdf2office.ConvertCallback @endlink object which is implemented by user
     *                                     to pause and notify the conversion progress during the converting process.
     *                                     This can be <b>NULL</b> which means not to pause and notify the conversion progress.
     *                                     If this is not <b>NULL</b>, it should be a valid @link conversion.pdf2office.ConvertCallback @endlink 
     *                                     object implemented by user.
     *                                     Default value: <b>NULL</b>.
     *
     * @return A progressive object. Please check the rate of current progress by function
     *         @link Progressive.GetRateOfProgress @endlink. If the rate is not 100 yet, call function
     *         @link Progressive.Continue @endlink to continue the progress until the progress is finished.
     *
     * @note If module "PDF2Office" is not defined in the license information which is used in function
     *       @link Library.Initialize @endlink, that means user has no right in using this function and
     *       this function will throw exception @link ErrorCode.e_ErrNoPDF2OfficeModuleRight @endlink.
     */
    StartConvertToPowerPointWithPath(src_pdf_path: string, src_pdf_password: string, saved_powerpoint_file_path: string, setting_data: PDFConversionSDK.PDF2OfficeSettingData, convert_callback: PDFConversionSDK.ConvertCallback): PDFConversionSDK.Progressive;
  }
}