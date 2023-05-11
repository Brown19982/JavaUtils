package com.example.demo.test;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.commons.lang3.StringUtils;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

public class pdfboxTest {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		pdfMixWatermark(new File("File Path"));
	}

	/**
	 * 檔案加上浮水印
	 * 
	 * @param orders
	 * @return
	 * @throws Exception
	 */
	public static File pdfMixWatermark(File inputFile) throws Exception {
		return pdfMixWatermark(inputFile, null);
	}

	public static File pdfMixWatermark(File inputFile, String readerPw) throws Exception {
		return pdfMixWatermark(inputFile, readerPw, null);
	}

	public static File pdfMixWatermark(File inputFile, String readerPw, String stamperPw) throws Exception {
		Path tempPath = Files.createTempFile(String.valueOf(System.currentTimeMillis()), ".pdf");
		if (!Files.exists(tempPath.getParent())) {
			Files.createDirectories(tempPath.getParent());
		}
		PDDocument document;
		if (StringUtils.isNotBlank(readerPw)) {
			document = Loader.loadPDF(inputFile, readerPw);
		} else {
			document = Loader.loadPDF(inputFile);
		}
		Path markImagePath = Paths.get("Image File Directory", "Image File Name");
		PDImageXObject img = PDImageXObject.createFromFile(markImagePath.toString(), document);
		int pageSize = document.getNumberOfPages();
		for (int i = 0; i < pageSize; i++) {
			PDPageContentStream contentStream = new PDPageContentStream(document, document.getPage(i),
					PDPageContentStream.AppendMode.APPEND, true, true);

			contentStream.drawImage(img, 163, -315, img.getWidth() * 0.53f, img.getHeight() * 0.53f);
			contentStream.close();
		}
		// 輸出加密
		if (StringUtils.isNotBlank(stamperPw)) {
			StandardProtectionPolicy spp = new StandardProtectionPolicy(stamperPw, stamperPw, new AccessPermission());
			document.protect(spp);
		}
		document.save(tempPath.toFile());
		document.close();
		return tempPath.toFile();
	}
}
