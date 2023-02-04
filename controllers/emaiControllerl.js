const nodemailer = require("nodemailer");
const util = require("util");
const fs = require("fs");
const connection = require("../database/connectdb");
//  node .\controllers\emaiControllerl.js
const query = util.promisify(connection.query).bind(connection);
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  VerticalAlign,
  WidthType,
} = require("docx");

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5090b953b74edc",
    pass: "961af8b61a80ba",
  },
});

const date = new Date(Date.now());

exports.createBCDT = async (req, res) => {
  const data_1 = async (date, num) => {
    const result = await query(`
    SELECT
    hoadonxuat.IDHoaDonXuat,
    hoadonxuat.NgayXuat,
    nhanvien.HoTen,
    hoadonxuat.TongThue AS Thue,
    hoadonxuat.TongTienHDX AS TongTien
    FROM
        hoadonxuat
    INNER JOIN nhanvien ON hoadonxuat.IDNhanVien = nhanvien.IDNhanVien
    WHERE
    hoadonxuat.NgayXuat >= SUBDATE('${date}', ${num}) AND hoadonxuat.NgayXuat <= '${date}'
    `);
    return result;
  };

  const data_2 = async (date, num) => {
    const result = await query(`
    SELECT
    SUBDATE('${date}', ${num}) AS dateFrom,
    '${date}' AS dateTo, SUM(hoadonxuat.TongTienHDX) as TongTien
    FROM
        hoadonxuat
    WHERE
    hoadonxuat.NgayXuat >= SUBDATE('${date}', ${num}) AND hoadonxuat.NgayXuat <= '${date}'`);
    return result[0];
  };

  const testData = await data_1(req.body.date, req.body.num);
  const sumHD = await data_2(req.body.date, req.body.num);

  let dmyFrom = new Date(`${sumHD.dateFrom}`)
    .toLocaleDateString("en-US", {
      timeZone: "Asia/Jakarta",
    })
    .split("/");

  let dmyTo = new Date(`${sumHD.dateTo}`)
    .toLocaleDateString("en-US", {
      timeZone: "Asia/Jakarta",
    })
    .split("/");

  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `STT`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Mã HD`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Ngày lập`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Người lập`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Thuế`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Tổng tiền (VND)`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
        tableHeader: true,
        height: { value: 600 },
      }),
    ],
    width: {
      size: 8500,
      type: WidthType.DXA,
    },
  });

  //
  testData.map((data, index) => {
    const dmy = new Date(`${data.NgayXuat}`)
      .toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
      })
      .split("/");
    const tableRow = new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.IDHoaDonXuat}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${dmy[2]}-${dmy[0]}-${dmy[1]}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.HoTen}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.Thue}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.TongTien}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
      ],
      height: { value: 500 },
    });

    table.root.push(tableRow);
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `Báo cáo doanh thu`,
                size: 40,
                bold: true,
                font: "arial",
              }),
            ],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Từ ngày `,
                size: 32,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${dmyFrom[1]} `,
                size: 32,
                font: "arial",
              }),
              new TextRun({
                text: `tháng `,
                size: 32,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${dmyFrom[0]} `,
                size: 32,
                font: "arial",
              }),
              new TextRun({
                text: `năm `,
                size: 32,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${dmyFrom[2]}`,
                size: 32,
                font: "arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Đến ngày `,
                size: 32,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${dmyTo[1]} `,
                size: 32,
                font: "arial",
              }),
              new TextRun({
                text: `tháng `,
                size: 32,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${dmyTo[0]} `,
                size: 32,
                font: "arial",
              }),
              new TextRun({
                text: `năm `,
                size: 32,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${dmyTo[2]}`,
                size: 32,
                font: "arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 500,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Hiệu thuốc số 09`,
                size: 28,
                bold: true,
                font: "arial",
              }),
            ],
            spacing: {
              after: 400,
            },
          }),
          table,
          new Paragraph({
            children: [
              new TextRun({
                text: `Tổng cộng: `,
                size: 28,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${sumHD.TongTien} VND`,
                size: 28,
                font: "arial",
              }),
            ],
            spacing: {
              before: 400,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `                                                                         Nhân viên lập phiếu`,
                size: 28,
                bold: true,
                font: "arial",
              }),
            ],
            spacing: {
              before: 500,
              after: 100,
            },
          }),
        ],
      },
    ],
  });
  Packer.toBuffer(doc).then((buffer) => {
    // fs.writeFileSync("My_Document.docx", buffer);
    let mailOptions = {
      from: `${req.user.email}`,
      to: "nguyenthanhthien0507@gmail.com",
      subject: `Báo cáo doanh thu: ${date} `,
      text: "Báo cáo doanh thu",
      html: "<b>Báo cáo doanh thu! </b><br> Vui lòng xem phiếu báo cáo",
      attachments: [
        {
          filename: `Bao_Cao_Doanh_Thu_${Date.now()}.docx`,
          content: Buffer.from(buffer, "UTF-8"),
        },
      ],
    };

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(404).json({
          status: "error",
          message: error.message,
        });
      } else {
        res.status(201).json({
          status: "success",
        });
      }
    });
  });
};

// createBCDT();

exports.createTKHTK = async (req, res) => {
  const data_1 = async () => {
    const result = await query(`
    SELECT
    thuoc.IDThuoc,
    thuoc.TenThuoc,
    thuoc.NSX,
    thuoc.SoLuong,
    thuoc.GiaBan AS DonGia,
    thuoc.DonVi,
    thuoc.HanSuDung AS HSD,
    IF(
        thuoc.HanSuDung > CURDATE(), "Còn hạn", "Hết hạn") AS GhiChu
    FROM
        thuoc
    `);
    return result;
  };
  const testData = await data_1();

  const table = new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `STT`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Tên thuốc`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Đơn vị`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `NSX`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `HSD`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Đơn giá (VND)`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Số lượng`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Ghi chú`,
                    size: 24,
                    font: "arial",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
        tableHeader: true,
        height: { value: 600 },
      }),
    ],
    width: {
      size: 9000,
      type: WidthType.DXA,
    },
  });

  //
  let sumDrugs = 0;
  testData.map((data, index) => {
    const dmy = new Date(`${data.HSD}`)
      .toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
      })
      .split("/");

    sumDrugs += data.SoLuong;
    const tableRow = new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.TenThuoc}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.DonVi}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.NSX}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${dmy[2]}-${dmy[0]}-${dmy[1]}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.DonGia}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.SoLuong}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data.GhiChu}`,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        }),
      ],
      height: { value: 500 },
    });

    table.root.push(tableRow);
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `Báo cáo thống kê hàng tồn kho`,
                size: 40,
                bold: true,
                font: "arial",
              }),
            ],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Ngày `,
                size: 32,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${date.getDate()} `,
                size: 32,
                font: "arial",
              }),
              new TextRun({
                text: `tháng `,
                size: 32,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${date.getMonth() + 1} `,
                size: 32,
                font: "arial",
              }),
              new TextRun({
                text: `năm `,
                size: 32,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${date.getFullYear()}`,
                size: 32,
                font: "arial",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 300,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Hiệu thuốc số 09`,
                size: 28,
                bold: true,
                font: "arial",
              }),
            ],
            spacing: {
              after: 400,
            },
          }),
          table,
          new Paragraph({
            children: [
              new TextRun({
                text: `Tổng cộng: `,
                size: 28,
                bold: true,
                font: "arial",
              }),
              new TextRun({
                text: `${sumDrugs} số lượng thuốc`,
                size: 28,
                font: "arial",
              }),
            ],
            spacing: {
              before: 400,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `                                                                         Nhân viên lập phiếu`,
                size: 28,
                bold: true,
                font: "arial",
              }),
            ],
            spacing: {
              before: 500,
              after: 100,
            },
          }),
        ],
      },
    ],
  });
  Packer.toBuffer(doc).then((buffer) => {
    // fs.writeFileSync("My_Document.docx", buffer);
    let mailOptions = {
      from: `${req.user.email}`,
      to: "nguyenthanhthien0507@gmail.com",
      subject: `BCTK hàng tồn kho: ${date} `,
      text: "Báo cáo hàng tồn kho",
      html: "<b>Báo cáo thống kê hàng tồn kho! </b><br> Vui lòng xem phiếu báo cáo",
      attachments: [
        {
          filename: `BCTK_Hang_Ton_Kho_${Date.now()}.docx`,
          content: Buffer.from(buffer, "UTF-8"),
        },
      ],
    };

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(404).json({
          status: "error",
          message: error.message,
        });
      } else {
        res.status(201).json({
          status: "success",
        });
      }
    });
  });
};
